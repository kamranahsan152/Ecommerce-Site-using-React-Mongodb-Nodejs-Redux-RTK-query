const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const AuthenticatedRoles = (...roles) => {
  return async (req, res, next) => {
    const token = req.headers.authorization;
    const decodeData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodeData.user.id);

    if (!roles.includes(req.user.role)) {
      return next(
        res.status(403).json({
          success: false,
          message: `Role:${req.user.role} is not allowed to access this resouce`,
        })
      );
    }
    next();
  };
};

module.exports = AuthenticatedRoles;
