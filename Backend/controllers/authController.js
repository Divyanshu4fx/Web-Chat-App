const User = require("../models/userModel.js")
const bcryptjs = require('bcryptjs');
const generateTokenAndSetCookie = require("../utils/generateToken.js");
// const user = require("../models/userModel.js");

const signup = async (req, res) => {
    const { fullname, username, password, confirmpassword, gender } = req.body;
    try {

        if (password !== confirmpassword) {
            return res.status(400).json({ error: "Password do not match." })
        }
        const user = await User.findOne({ username })
        if (user) {
            return res.status(400).json({ error: "Username already exist" })
        }

        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt);
        const names = fullname.split(" ")
        const userProfilePic = `https://avatar.iran.liara.run/username?username=${names[0]}+${names[1]}`
        // const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        // const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`
        const newUser = new User(
            {
                fullname,
                username,
                password: hashPassword,
                gender,
                profilePic: userProfilePic
            }
        )
        if (newUser) {
            //Generate JWT Token here...
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();
            res.status(201).json({
                _id: newUser.id,
                fullname: newUser.fullname,
                username: newUser.username,
                profilePic: newUser.profilePic
            })
        }
        else {
            res.status(400).json({ error: "Invalid user data" });
        }
    }

    catch (e) {
        console.log("Error in singup controller"+ e.message);
        res.status(500).json({ error: "Internal Server error "});
    }
}

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        const isPasswordCorrect = await bcryptjs.compare(password, user?.password || "");
        if (!user || !isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid Username or password" })
        }
        const token = generateTokenAndSetCookie(user._id, res);
        res.status(200).json({
            _id: user._id,
            fullname: user.fullname,
            username: user.username,
            profilePic: user.profilePic,
        });
    }
    catch (e) {
        console.log("Error in login controller "+ e.message);
        res.status(500).json({ error: "Internal Server error"});
    }
}


const logout = (req, res) => {
    try {
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"Succesfully logout"});
    }
    catch (e) {
        console.log("Error in logout controller "+ e.message);
        res.status(500).json({ error: "Internal Server error"});
    }
}

module.exports = { signup, login, logout };