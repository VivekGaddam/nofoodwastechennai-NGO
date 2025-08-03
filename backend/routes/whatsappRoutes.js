const express = require('express');
const router = express.Router();
const { sendWhatsAppMessage } = require('../controllers/whatsappController');
const { protect } = require('../middleware/authMiddleware');

router.post('/send', protect, sendWhatsAppMessage);

module.exports = router;
