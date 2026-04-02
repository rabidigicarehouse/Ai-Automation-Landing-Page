import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({
   origin: ['http://localhost:5173', 'http://127.0.0.1:5173'], // Restrict to standard Vite ports
   methods: ['POST']
}));
app.use(express.json());

// Nodemailer Transporter Setup using custom SMTP configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_PORT == 465, // true for 465, false for 587 and others
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

app.post('/api/contact', async (req, res) => {
  const { user_name, user_email, service, budget, message, recaptcha_token } = req.body;

  // 1. Validate Required Fields
  if (!user_name || !user_email || !message || !recaptcha_token) {
    return res.status(400).json({ error: 'Missing required fields or recaptcha token.' });
  }

  try {
    // 2. Verify ReCaptcha Token via Google's API
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptcha_token}`;
    const recaptchaRes = await fetch(verifyUrl, { method: 'POST' });
    const recaptchaData = await recaptchaRes.json();

    if (!recaptchaData.success) {
      console.error('ReCaptcha Failure:', recaptchaData);
      return res.status(400).json({ error: 'ReCaptcha verification failed.' });
    }

    // 3. Construct Email Payload
    const mailOptions = {
      from: `"${user_name}" <${process.env.SMTP_USER}>`, 
      replyTo: user_email,
      to: process.env.SMTP_TO, 
      subject: `New Ai/Automation Inquiry: ${service} from ${user_name}`,
      html: `
        <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto; color: #111;">
          <h2 style="border-bottom: 2px solid #FF4D00; padding-bottom: 10px;">New Ai/Automation Lead</h2>
          <p><strong>Name:</strong> ${user_name}</p>
          <p><strong>Email:</strong> ${user_email}</p>
          <p><strong>Service Requested:</strong> ${service || 'General'}</p>
          <p><strong>Target Budget:</strong> ${budget || 'Not specified'}</p>
          
          <h3 style="margin-top: 30px;">Project Details:</h3>
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 8px;">
             ${message.replace(/\n/g, '<br/>')}
          </div>
        </div>
      `
    };

    // 4. Send Email via Gmail SMTP
    await transporter.sendMail(mailOptions);
    
    res.status(200).json({ success: true, message: 'Message sent successfully.' });

  } catch (error) {
    console.error('Server Mail Error:', error);
    res.status(500).json({ error: 'Internal Server Error while sending email.' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Design Agency Backend running on http://localhost:${PORT}`);
  console.log(`📧 Nodemailer hooked up to SMTP: ${process.env.SMTP_USER || 'MISSING .ENV CONFIG'}`);
});
