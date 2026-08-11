const nodemailer = require('nodemailer');

// Initialize transporter if SMTP variables are provided
let transporter = null;
if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

/**
 * Common HTML wrapper template for Shuddhik emails.
 */
const getHtmlWrapper = (title, content) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
        <style>
          body {
            font-family: 'Mukta', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #FDF7EA;
            color: #1E1410;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 30px auto;
            background-color: #ffffff;
            border: 1px solid rgba(212, 175, 55, 0.3);
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(58, 12, 20, 0.05);
          }
          .header {
            background-color: #3A0C14;
            color: #FDF7EA;
            text-align: center;
            padding: 30px 20px;
          }
          .header h1 {
            margin: 0;
            font-family: 'Cinzel', serif;
            font-size: 24px;
            letter-spacing: 2px;
            color: #D4AF37;
          }
          .content {
            padding: 40px 30px;
            line-height: 1.6;
          }
          .otp-box {
            background-color: #FDF7EA;
            border: 2px dashed #D4AF37;
            border-radius: 12px;
            text-align: center;
            font-size: 32px;
            font-weight: bold;
            letter-spacing: 8px;
            color: #7A1E2E;
            padding: 20px;
            margin: 30px 0;
          }
          .footer {
            background-color: #F6EDD8;
            text-align: center;
            padding: 20px;
            font-size: 12px;
            color: #4A382E;
            border-top: 1px solid rgba(212, 175, 55, 0.15);
          }
          .footer p {
            margin: 5px 0;
          }
          .deva {
            font-size: 16px;
            color: #C97A1A;
            margin-top: 10px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>SHUDDHIK</h1>
          </div>
          <div class="content">
            ${content}
          </div>
          <div class="footer">
            <p>This is an automated email from Shuddhik. Please do not reply.</p>
            <p>If you did not request this, please ignore this email.</p>
            <p class="deva">May your space remain pure. ॐ शान्तिः</p>
          </div>
        </div>
      </body>
    </html>
  `;
};

/**
 * Send an email
 */
const sendEmail = async ({ to, subject, html, text }) => {
  // Always log cleartext OTP and body to node console first for local development
  console.log(`\n============================================`);
  console.log(`✉️  EMAIL SENT`);
  console.log(`To: ${to}`);
  console.log(`Subject: ${subject}`);
  console.log(`--------------------------------------------`);
  console.log(text);
  console.log(`============================================\n`);

  if (!transporter) {
    console.log('[Nodemailer fallback] SMTP is not configured. Email logged to console.');
    return { messageId: 'console-fallback-id' };
  }

  const mailOptions = {
    from: process.env.SMTP_FROM || `"Shuddhik Support" <${process.env.SMTP_USER}>`,
    to,
    subject,
    text,
    html,
  };

  return transporter.sendMail(mailOptions);
};

/**
 * Sends OTP for Manual Email Verification (Signup/Verification resend)
 */
const sendVerificationOtp = async (email, name, otp) => {
  const subject = 'Verify your email address - Shuddhik';
  const text = `Namaste ${name},\n\nThank you for choosing Shuddhik. To complete your registration, please verify your email address using the following 6-digit One Time Password (OTP):\n\n${otp}\n\nThis OTP is valid for 5 minutes. Please do not share this OTP with anyone.\n\nWarm regards,\nTeam Shuddhik`;
  
  const htmlContent = `
    <h2 style="font-family: 'Cinzel', serif; color: #3A0C14; margin-top: 0;">Namaste ${name},</h2>
    <p>Thank you for choosing Shuddhik. To complete your registration and secure your account, please verify your email address using the 6-digit One Time Password (OTP) below:</p>
    <div class="otp-box">${otp}</div>
    <p style="font-weight: 550; color: #7A1E2E;">This OTP is valid for exactly 5 minutes.</p>
    <p>For your security, do not share this code with anyone. If you didn't initiate this request, you can safely ignore this email.</p>
  `;
  const html = getHtmlWrapper(subject, htmlContent);

  return sendEmail({ to: email, subject, html, text });
};

/**
 * Sends OTP for Password Reset
 */
const sendPasswordResetOtp = async (email, name, otp) => {
  const subject = 'Password Reset Request - Shuddhik';
  const text = `Namaste ${name},\n\nWe received a request to reset your password. Please use the following 6-digit One Time Password (OTP) to proceed with resetting your password:\n\n${otp}\n\nThis OTP is valid for 5 minutes. If you did not request this, please ignore this email.\n\nWarm regards,\nTeam Shuddhik`;
  
  const htmlContent = `
    <h2 style="font-family: 'Cinzel', serif; color: #3A0C14; margin-top: 0;">Namaste ${name},</h2>
    <p>We received a request to reset the password for your Shuddhik account. Please use the 6-digit One Time Password (OTP) below to proceed:</p>
    <div class="otp-box">${otp}</div>
    <p style="font-weight: 550; color: #7A1E2E;">This OTP is valid for exactly 5 minutes.</p>
    <p>If you did not make this request, please ignore this email or contact support if you suspect unauthorized access.</p>
  `;
  const html = getHtmlWrapper(subject, htmlContent);

  return sendEmail({ to: email, subject, html, text });
};

module.exports = {
  sendVerificationOtp,
  sendPasswordResetOtp,
};
