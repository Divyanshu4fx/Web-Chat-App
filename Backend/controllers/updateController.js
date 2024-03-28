const User = require('../models/userModel.js');
const fs = require('fs').promises;;
const bcryptjs = require('bcryptjs');
const updateUser = async (req, res) => {
    const { fullname, username, gender } = req.body;
    try {
        const loggedUserId = req.user._id;
        const user = await User.findOne({ username })
        if (user) {
            return res.status(400).json({ error: "Username already exist" })
        }
        const updatedUser = await User.findByIdAndUpdate({ _id: loggedUserId }, { fullname, username, gender }, { new: true }).select("-password");
        if (updatedUser) {
            res.status(200).json(updatedUser);
        }
        else {
            res.status(404).json({ message: "User not Found" });
        }
    } catch (e) {
        console.log("Error in updateController " + e.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

const updatePassword = async (req, res) => {
    const loggedUserId = req.user._id;
    const { oldPassword, newPassword } = req.body;
    try {
        const user = await User.findById({ _id: loggedUserId }).select("-profilePic -gender -fullname");
        const isPasswordCorrect = await bcryptjs.compare(oldPassword, user?.password || "");
        if (!isPasswordCorrect) {
            res.status(401).json({ error: "Invalid Password" })
        }
        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(newPassword, salt);
        user.password = hashPassword;
        const updatedUser = await User.findByIdAndUpdate({ _id: loggedUserId }, { password : hashPassword }, { new: true });
        const savedUser = await user.save();
        if (savedUser) {
            res.status(200).json({ message: "Password Change Successfull" });
        }
        else {
            res.status(404).json({ message: "User not Found" });
        }
    } catch (e) {

    }
}

const updateProfilePic = async (req, res) => {
    try {
        const loggedUserId = req.user._id;
        const dataUrl = await imageToBase64(req.file.destination, req.file.filename);
        const updatedUser = await User.findByIdAndUpdate({ _id: loggedUserId }, { profilePic: dataUrl }, { new: true });
        if (updatedUser) {
            res.status(200).json({
                _id: updatedUser.id,
                fullname: updatedUser.fullname,
                username: updatedUser.username,
                gender: updatedUser.gender,
                profilePic: updatedUser.profilePic
            })
        }
        else {
            res.status(404).json({ message: "User not Found" });
        }
    } catch (e) {
        console.log("Error in updateController " + e.message);
        res.status(500).json({ error: "Internal server error" });
    }
}
module.exports = { updateUser, updatePassword, updateProfilePic }

async function imageToBase64(filePath, filename) {
    const path = filePath + filename;
    try {
        const data = await fs.readFile(path);
        const base64String = Buffer.from(data).toString('base64');
        const dataUrl = `data:image/jpeg;base64,${base64String}`;
        await fs.unlink(path);
        return dataUrl;
    } catch (error) {
        console.log("Error123" + error.message);
        throw error;
    }
}