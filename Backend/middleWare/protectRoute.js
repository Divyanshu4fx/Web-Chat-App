const jwt = require("jsonwebtoken")
const User = require("../models/userModel.js")

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ error: "Unauthorized - No token provided " });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ error: "Unauthorized - Invalid Token" });
        }
        const user = await User.findById(decoded.UserId).select("-password");
        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }
        req.user = user;
        next();
    } catch (e) {
        console.log("Error in protectRoute middleWare" + e.message);
        res.status(500).json({ error: "Internal server Error" });
    }
}

module.exports = protectRoute;