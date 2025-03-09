const bcrypt = require("bcryptjs");
const userModel = require("../../models/userModel");

async function userResetPassword(req, res) {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password) {
      throw new Error("Please provide a new password");
    }

    // Find user by token and check expiration
    const user = await userModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      throw new Error("Invalid or expired reset token");
    }

    // Hash the new password and update the user
    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined; // Clear the reset token
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successfully!",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message || "Internal Server Error",
    });
  }
}

module.exports = userResetPassword;
