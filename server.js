require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/send', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.json({ success: false });
    }

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        await transporter.sendMail({
            from: `"Portfolio" <${process.env.EMAIL}>`,
            to: process.env.EMAIL,
            subject: `🚀 New Message from ${name}`,
            text: `
Name: ${name}
Email: ${email}

Message:
${message}
            `
        });

        res.json({ success: true });

    } catch (err) {
        console.log("❌ Email error:", err);
        res.json({ success: false });
    }
});

app.listen(5000, () => {
    const backendURL = 'https://sargam-portfolio.onrender.com/send'; // <-- Render URL
});