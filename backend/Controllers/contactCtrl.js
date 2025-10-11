const nodemailer = require('nodemailer');
require('dotenv').config();


const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // Use STARTTLS
    auth: {
        user: process.env.EMAIL_USER, // Admin email
        pass: process.env.EMAIL_PASS, // Admin email password
    },
    tls: {
        rejectUnauthorized: false, // Bypass self-signed certificate check
    },
});

// Controller function to handle contact form submissions
const submitMessage = async (req, res) => {
    const { name, email, message } = req.body;

    // Define email options
    const mailOptions = {
        from: email,
        to: process.env.EMAIL_USER, // Admin email
        subject: 'New Contact Form Submission',
        text: `You have received a new message from ${name} (${email}):\n\n${message}`,
    };

    try {
        // Send email
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ message: 'Failed to send message. Please try again later.' });
    }
};

module.exports = submitMessage;
