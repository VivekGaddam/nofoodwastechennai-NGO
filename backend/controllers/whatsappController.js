const twilio = require('../config/twilio');

const sendWhatsApp = async (to, body) => {
  try {
    const message = await twilio.messages.create({
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
      to: `whatsapp:${to}`,
      body: body,
    });
    console.log(`WhatsApp message sent to ${to}: ${message.sid}`);
    return { success: true, message: 'WhatsApp message sent successfully' };
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
    return { success: false, message: 'Failed to send WhatsApp message' };
  }
};

const sendWhatsAppMessage = async (req, res) => {
  const { to, body } = req.body;
  const result = await sendWhatsApp(to, body);
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(500).json(result);
  }
};

module.exports = { sendWhatsApp, sendWhatsAppMessage };
