const User = require('../models/userModel.js');
const multer = require('multer');
const bcryptjs = require('bcryptjs');
const updateUser = async (req, res) => {
    const { fullname, username, gender } = req.body;
    try {
        const loggedUserId = req.user._id;
        const updatedUser = await User.findByIdAndUpdate({ _id: loggedUserId }, { fullname, username, gender }, { new: true });
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
    console.log("Enter updatePassword");
    const loggedUserId = req.user._id;
    const { oldPassword, newPassword } = req.body;
    try {
        const user = await User.findById({ _id: loggedUserId });
        const isPasswordCorrect = await bcryptjs.compare(oldPassword, user?.password || "");
        if (!isPasswordCorrect) {
            res.status(401).json({ message: "Invalid Password" })
        }
        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(newPassword, salt);
        user.password = hashPassword;
        // const updatedUser = await User.findByIdAndUpdate({ _id: loggedUserId }, { password : hashPassword }, { new: true });
        const savedUser = await user.save();
        if (savedUser) {
            // console.log('User saved successfully:', savedUser);
            res.status(200).json({message : "Password Change Successfull"});
        }
        else {
            res.status(404).json({ message: "User not Found" });
        }
    } catch (e) {

    }
}

const updateProfilePic = async (req,res) =>{
    console.log(req.body);
    console.log(req.file);
    res.status(200).json({message : "OK"});
}
module.exports = { updateUser, updatePassword ,updateProfilePic }