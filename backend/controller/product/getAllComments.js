const Comment = require("../../models/commentModel");
 
const getAllComments = async (req, res) => {
  try {
    const { id : productId } = req.params;
 
    const comments = await Comment.find({ product: productId }).populate("user", "name"); // Populate user email
 
    res.status(200).json({success: true, comments: comments || [] });
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ message: error.message });
  }
};
 
module.exports = getAllComments;