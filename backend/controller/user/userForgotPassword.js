const crypto = require("crypto");
const nodemailer = require("nodemailer");
const userModel = require("../../models/userModel");

async function userForgotPassword(req, res) {
  try {
    const { email } = req.body;

    if (!email) {
      throw new Error("Please provide an email");
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      throw new Error("User not found with this email");
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 minutes expiration
    await user.save();

    // Send email with reset link
    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false, //  bypass SSL/TLS certificate issues
      },
    });
    await transporter.sendMail({
      to: user.email,
      subject: "Password Reset Request",
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password. This link will expire in 15 minutes.</p>`,
    });

    res.status(200).json({
      success: true,
      message: "Password reset email sent successfully!",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message || "Internal Server Error",
    });
  }
}

module.exports = userForgotPassword;
