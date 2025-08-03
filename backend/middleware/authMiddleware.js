const mongoose = require('mongoose');
// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/User'); // or Admin if you're using that
exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { _id: decoded.id, role: decoded.role }; // no DB lookup

    if (decoded.id !== process.env.ADMIN_ID || decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access only' });
    }

    next();
  } catch (err) {
    console.error("JWT Error:", err.message);
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};



exports.admin = (req, res, next) => {
  console.log('Checking admin access for user:', req.user);
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Admin access only' });
  }
};
