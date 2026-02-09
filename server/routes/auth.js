const express = require("express");
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin.js");
const router = express.Router();
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }
    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.status(200).json({
      message: "Login successful",
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
});
module.exports = router;
