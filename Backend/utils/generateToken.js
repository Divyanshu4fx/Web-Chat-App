const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');

dotenv.config();

const generateTokenAndSetCookie = (UserId, res) => {
    const token = jwt.sign({ UserId }, process.env.JWT_SECRET, {
        expiresIn: '15d',
    });
    res.cookie('jwt', token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        // hostOnly: false,
    });
};

module.exports = generateTokenAndSetCookie;