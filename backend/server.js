const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const passport = require('passport');

dotenv.config();

const connectDB = require('./config/db');
require('./config/passport'); 
require('./firebaseAdmin');
const authRoutes = require('./routes/authRoutes');
const whatsappRoutes = require('./routes/whatsappRoutes');
const donationRoutes = require('./routes/donationRoutes');
const hungerSpotRoutes = require('./routes/hungerSpotRoutes');
const volunteerRoutes = require('./routes/volunteerRoutes');
const errorHandler = require('./middleware/errorMiddleware');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'https://nofoodwastechennainngo.onrender.com', // Frontend port
  credentials: true, // Must be true for cookies to be accepted
}));
app.use(express.json());
app.use(passport.initialize());

// Public Routes
app.use('/api/auth', authRoutes);
app.use('/api/whatsapp', whatsappRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/hunger-spots', hungerSpotRoutes);
app.use('/api/volunteers', volunteerRoutes);

app.use(errorHandler);

app.get('/', (req, res) => {
  res.json({ message: 'Backend server is running 🚀' });
});

const User = require('./models/User');
const HungerSpot = require('./models/HungerSpot');

connectDB().then(() => {
  // Sync Mongoose indexes
  User.syncIndexes();
  HungerSpot.syncIndexes();

  app.listen(PORT, () => {
    console.log(`✅ Server started on http://localhost:${PORT}`);
  });
});
