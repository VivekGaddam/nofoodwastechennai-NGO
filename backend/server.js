const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const { Server } = require('socket.io');
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
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(express.json());
app.use(passport.initialize());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/hunger-spots', hungerSpotRoutes);
app.use('/api/volunteers', volunteerRoutes);
app.use('/api/whatsapp', whatsappRoutes);

app.use(errorHandler);

app.get('/', (req, res) => {
    res.json({ message: 'Backend server is running 🚀' });
});

const server = http.createServer(app);

// Socket.IO setup
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});
const volunteerSockets = {};
io.on('connection', (socket) => {
    console.log('A volunteer connected:', socket.id);
    socket.on('registerVolunteer', (volunteerId) => {
        volunteerSockets[volunteerId] = socket.id;
    });
    socket.on('disconnect', () => {
        for (const [volunteerId, sockId] of Object.entries(volunteerSockets)) {
            if (sockId === socket.id) {
                delete volunteerSockets[volunteerId];
                break;
            }
        }
    });
});

app.set('io', io);
app.set('volunteerSockets', volunteerSockets);

connectDB().then(() => {
    server.listen(PORT, () => {
        console.log(`✅ Server started on http://localhost:${PORT}`);
    });
});
