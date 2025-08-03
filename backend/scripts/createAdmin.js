const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { hashPassword } = require('../utils/hash');
const User = require('../models/User');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    const email = 'admin@gmail.com';

    const existing = await User.findOne({ email });
    if (existing) {
      console.log('Admin already exists');
      process.exit(0);
    }

    const passwordHash = await hashPassword('admin1234');
    await User.create({
      name: 'Admin',
      email,
      phone: '9999999999',
      passwordHash,
      latitude: 0,
      longitude: 0,
      role: 'admin',
      isVerified: true
    });

    console.log('Admin created successfully');
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
