const mongoose = require("mongoose");

const OTPSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  OTP: {
    type: String,
    required: true,
  },
});

const OTPModel = mongoose.model("OTP's", OTPSchema);

module.exports = OTPModel;
