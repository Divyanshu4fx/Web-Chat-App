const User = require("../models/userModel.js")
const bcryptjs = require('bcryptjs');
const generateTokenAndSetCookie = require("../utils/generateToken.js");
const OTPModel= require("../models/OTPmodel.js")
const signup = async (req, res) => {
    const { fullname, username, email, password, confirmpassword, gender } = req.body;
    try {

        if (password !== confirmpassword) {
            return res.status(400).json({ error: "Password do not match." })
        }
        const user = await User.findOne({ username })
        if (user) {
            return res.status(400).json({ error: "Username already exist" })
        }
        const mail = await User.findOne({ email })
        if (mail) {
            return res.status(400).json({ error: "Email already exist" })
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
                email,
                password: hashPassword,
                gender,
                profilePic: userProfilePic
            }
        )
        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();
            res.status(201).json({
                _id: newUser.id,
                fullname: newUser.fullname,
                username: newUser.username,
                email: newUser.email,
                gender: newUser.gender,
                profilePic: newUser.profilePic
            })
        }
        else {
            res.status(400).json({ error: "Invalid user data" });
        }
    }

    catch (e) {
        console.log("Error in singup controller" + e.message);
        res.status(500).json({ error: "Internal Server error " });
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
            gender: user.gender,
            profilePic: user.profilePic,
        });
    }
    catch (e) {
        console.log("Error in login controller " + e.message);
        res.status(500).json({ error: "Internal Server error" });
    }
}


const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Succesfully logout" });
    }
    catch (e) {
        console.log("Error in logout controller " + e.message);
        res.status(500).json({ error: "Internal Server error" });
    }
}

const verifyEmail= async(req,res) => {
    try{
        const { email, newRegister } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser && newRegister === "true") {
      return res.status(400).send({
        success: false,
        message: "User already exists",
      });
    }
    if (!existingUser && newRegister === "false") {
      return res.status(400).send({
        success: false,
        message: "User not registered",
      });
    }
        const speakeasy = require("speakeasy");

    // Generate a secret key with a length of 20 characters
    const secret = speakeasy.generateSecret({ length: 20 });

    // Generate a TOTP code using the secret key
    const code = speakeasy.totp({
      // Use the Base32 encoding of the secret key
      secret: secret.base32,

      // Tell Speakeasy to use the Base32 encoding format for the secret key
      encoding: "base32",
    });

    const nodemailer = require("nodemailer");

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: "modernprofile12@gmail.com",
        pass: process.env.password,
      },
    });

    await transporter.sendMail({
      from: '"ChatApp👻" <modernprofile12@gmail.com>', // sender address
      to: req.body.email, // lison53@etist of receivers
      subject: "OTP", // Subject line
      html: `<b>Hello, OTP for registration is ${code}</b>`, // html body
    });

    const salt = await bcryptjs.genSalt(10);
    const hashedOTP = await bcryptjs.hash(code, salt);

    req.body.OTP = hashedOTP;

    const model = await OTPModel.findOneAndUpdate(
      { email },
      // Update
      { OTP: req.body.OTP },
      // Options
      {
        // If document doesn't exist, create a new one
        upsert: true,
        // Return the updated document
        returnOriginal: true,
      }
    );

    res.status(201).send({
      success: true,
      message: "OTP sent successfully to the email id",
    });
    }
    catch (e) {
        console.log("Error in verifyEmail controller " + e.message);
        res.status(500).json({ error: "Internal Server error" });
    }
}
const verifyOTP = async (req, res) => {
    try {
      const OTP = req.body.OTP;
      const user = await OTPModel.findOne({ email: req.body.email });
      if (await bcryptjs.compare(OTP, user.OTP)) {
        await user.deleteOne();
        res.status(200).send({
          success: true,
          message: "OTP verified",
        });
      } else {
        res.status(401).send({
          success: false,
          message: "OTP is incorrect",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: `verifyOTPController failed `,
        error,
      });
    }
  };

  const changePasswordController = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);
  
      req.body.password = hashedPassword;
  
      const user = await User.findOneAndUpdate(
        { email },
        { password: hashedPassword }
      );
      // let token = jwt.sign({ id: user }, process.env.JWT_SECRET, {
      //   expiresIn: "2h",
      // });
      res.status(201).send({
        success: true,
        message: "Password changed successfully",
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        error,
        message: `error in changePasswordController `,
      });
    }
  };

module.exports = { signup, login, logout , verifyEmail, verifyOTP, changePasswordController};