require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public')); // serve frontend files

app.post('/send', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.json({ success: false, error: "All fields required" });
    }

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            },
            tls: { rejectUnauthorized: false }
        });

        await transporter.sendMail({
            from: `"Portfolio" <${process.env.EMAIL}>`,
            to: process.env.EMAIL,
            subject: `🚀 New Message from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`
        });

        res.json({ success: true });

    } catch (err) {
        console.error("❌ Email error:", err);
        res.json({ success: false, error: "Email failed" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));