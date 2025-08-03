const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = (io) => {
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      if (!token) {
        return next(new Error('Authentication error'));
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select('-passwordHash');
      if (!user) {
        return next(new Error('Authentication error'));
      }
      socket.user = user;
      next();
    } catch (error) {
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', (socket) => {
    console.log('A user connected:', socket.user.name);

    socket.on('updateLocation', async (data) => {
      try {
        const { lat, lng } = data;
        await User.findByIdAndUpdate(socket.user._id, {
          location: {
            type: 'Point',
            coordinates: [lng, lat],
          },
        });
        console.log(`Location updated for ${socket.user.name}: ${lat}, ${lng}`);
      } catch (error) {
        console.error('Error updating location:', error);
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.user.name);
    });
  });
};