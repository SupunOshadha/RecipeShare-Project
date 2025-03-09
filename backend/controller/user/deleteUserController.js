const User = require("../../models/userModel"); // Import your User model

const deleteUserController = async (req, res) => {
  try {
    const { userId } = req.params; // Extract userId from request params

    // Find and delete the user
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = deleteUserController;
