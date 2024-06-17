const express = require("express");
const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jsonMiddleware = require("../middleware/bodyParser");
const router = express.Router();
const jwt = require("jsonwebtoken");
const isAuthenticated = require("../middleware/auth");
const AuthenticatedRoles = require("../middleware/authrole");
const User = require("../models/userModel");

router.post("/register", jsonMiddleware, async (req, res) => {
  const { name, email, password, phoneNumber, role } = req.body;

  try {
    let user = await userModel.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    user = new userModel({
      name,
      email,
      password,
      phoneNumber,
      role,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      algorithm: "HS256",
    });

    await user.save();
    res.status(200).json({
      token: token,
      role: role,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/login", jsonMiddleware, async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const payload = {
      user: {
        id: user._id,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      algorithm: "HS256",
    });
    res.status(200).json({
      success: "Login Success!",
      token: token,
      role: user.role,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/reset-password", jsonMiddleware, async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "Email is invalid!" });
    }

    if (!newPassword) {
      return res.status(400).json({ msg: "New password is required" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    user.authToken = undefined;

    const payload = {
      user: {
        id: user._id,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      algorithm: "HS256",
    });
    user.authToken = token;
    await user.save();

    return res.status(200).json({
      token,
      msg: "Password reset successfully",
      role: user.role,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
router.get("/me", isAuthenticated, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json({ user: req.user });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

router.get(
  "/allusers",
  isAuthenticated,
  // AuthenticatedRole("admin"),
  async (req, res) => {
    try {
      const users = await userModel.find({ role: "user" });
      res.status(200).json(users);
    } catch (error) {
      res.status(400).json({ msg: "Not found" });
    }
  }
);

router.delete(
  "/user/:id",
  isAuthenticated,
  AuthenticatedRoles("admin"),
  async (req, res) => {
    const id = req.params.id;
    try {
      const findUser = await userModel.findById(id);

      if (!findUser) {
        return res.status(404).json({ msg: "User not found!" });
      }

      await userModel.deleteOne({ _id: id });

      res.status(200).json({ msg: "User deleted successfully!" });
    } catch (error) {
      res.status(400).json({ msg: "Unable to delete user" });
    }
  }
);

module.exports = router;
