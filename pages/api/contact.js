import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { name, email, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: 'smtp.mail.me.com',
    port: 587,
    secure: false,
    auth: {
      user: 'williamrozier@icloud.com',
      pass: process.env.EMAIL_PASS, // Use an iCloud "App Password"
    },
  });
  
  const mailOptions = {
    from: email, // User's email
    to: 'williamrozier@icloud.com', // Your iCloud email
    subject: `New Contact Form Message: ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
  };
  

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Email sent!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Email failed to send.' });
  }
}
