const User = require("../models/User");
const mongoose = require("mongoose");
const { hashPassword, comparePassword } = require("../utils/hash");
const { generateToken } = require("../utils/token");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

// Volunteer Registration
exports.registerVolunteer = async (req, res) => {
  try {
    const { name, email, phone, password, latitude, longitude } = req.body;

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ error: "Email already registered" });

    const passwordHash = await hashPassword(password);

    const newUser = new User({
      name,
      email,
      phone,
      passwordHash,
      role: "volunteer",
      isVerified: true,
      location: {
        type: "Point",
        coordinates: [longitude, latitude],
      },
    });

    await newUser.save();

    const token = generateToken({
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      role: newUser.role,
      isVerified: newUser.isVerified,
      location: newUser.location,
      available: newUser.location?.available || true,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      message: "Volunteer registered successfully",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role,
        isVerified: newUser.isVerified,
        location: newUser.location,
      },
    });
  } catch (err) {
    console.error("❌ Error in registerVolunteer:", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Donor Registration
exports.registerDonor = async (req, res) => {
  try {
    const { name, email, phone, password, address, latitude, longitude } = req.body;

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ error: "Email already registered" });

    const passwordHash = await hashPassword(password);

    const newUser = new User({
      name,
      email,
      phone,
      passwordHash,
      address,
      location: {
        type: "Point",
        coordinates: [longitude, latitude],
      },
      role: "donor",
      isVerified: true,
    });

    await newUser.save();

    const token = generateToken({
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      role: newUser.role,
      isVerified: newUser.isVerified,
      location: newUser.location,
      available: newUser.location?.available || true,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      message: "Donor registered successfully",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role,
        isVerified: newUser.isVerified,
        location: newUser.location,
      },
    });
  } catch (err) {
    console.error("❌ Error in registerDonor:", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// User Login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = generateToken({
        id: process.env.ADMIN_ID,
        role: "admin",
      });

      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.json({ token, role: "admin", name: "Admin" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const isMatch = await comparePassword(password, user.passwordHash);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = generateToken({
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      isVerified: user.isVerified,
      location: user.location,
      available: user.location?.available || true,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        isVerified: user.isVerified,
        location: user.location,
      },
    });
  } catch (err) {
    console.error("❌ Error in loginUser:", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Forgot Password
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    user.resetPasswordExpire = Date.now() + 3600000; // 1 hour

    await user.save();

    const resetURL = `${req.protocol}://${req.get("host")}/api/auth/resetpassword/${resetToken}`;
    const message = `You have requested a password reset. Please make a PUT request to: \n\n${resetURL}`;

    try {
      await sendEmail({
        email: user.email,
        subject: "Password Reset Token",
        message,
      });

      res.status(200).json({ message: "Email sent" });
    } catch (err) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();
      console.error("❌ Error sending email:", err.message);
      return res.status(500).json({ error: "Email could not be sent" });
    }
  } catch (err) {
    console.error("❌ Error in forgotPassword:", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resettoken)
    .digest("hex");

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid or expired reset token" });
    }

    user.passwordHash = await hashPassword(req.body.password);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    console.error("❌ Error in resetPassword:", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};
