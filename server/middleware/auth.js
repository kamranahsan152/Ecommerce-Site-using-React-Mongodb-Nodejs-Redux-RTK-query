const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const auth = async (req, res, next) => {
  const authToken = req.headers.authorization;
  if (!authToken) {
    return next(
      res.status(401).json({
        message: "Please Login to Access this Resource",
      })
    );
  } else {
    try {
      const decodeData = jwt.verify(authToken, process.env.JWT_SECRET);
      req.user = await User.findById(decodeData.user.id);
      next();
    } catch (error) {
      console.error("JWT verification error:", error.message);
    }
  }
};

module.exports = auth;
