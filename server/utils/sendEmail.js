import nodemailer from 'nodemailer';

const sendEmail = async ({ to, subject, text }) => {
  try {
    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER, // SMTP username
        pass: process.env.SMTP_PASS, // SMTP password
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.SMTP_FROM,
      to,
      subject,
      text,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully to ${to}`);
  } catch (error) {
    console.error(`Failed to send email: ${error.message}`);
    throw error;
  }
};

export default sendEmail;