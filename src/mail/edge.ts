import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const EMAIL_SUBJECT = "Sending Verification Link";

// Function to create and return a Nodemailer transporter
function createTransporter() {
  return nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD,
    },
  });
}

// Function to send email
async function sendEmail(to: string, email: string, link: string) {
  const transporter = createTransporter();

  // Construct HTML content using template strings
  // Construct HTML content using template strings
  const htmlContent = `
  <div style="background-color: #f4f4f4; padding: 20px;">
    <div style="max-width: 600px; margin: 0 auto; padding: 40px; background-color: #ffffff; border-radius: 10px; box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);">
      <h1 style="text-align: center; color: #333333; font-family: 'Arial', sans-serif;">Hello ${email}</h1>
      <p style="text-align: center; color: #666666; font-family: 'Arial', sans-serif;">Thank you for registering. Please click the button below to verify your account:</p>
      <div style="text-align: center; margin-top: 20px;">
        <a href="${link}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 5px; font-family: 'Arial', sans-serif;">Verify Account</a>
      </div>
      <p style="text-align: center; color: #666666; font-family: 'Arial', sans-serif; margin-top: 20px;">If you did not sign up for an account, please ignore this email.</p>
    </div>
  </div>
`;

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to,
    subject: EMAIL_SUBJECT,
    text: "verify Account",
    html: htmlContent,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

export default sendEmail;
