const Comment = require("../../models/commentModel");
const Product = require("../../models/productModel");
 
const addComments = async (req, res) => {
  try {
    const { text } = req.body;
    const { productId } = req.params;
    const userId = req.userId;
 
    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
 
    // Create and save the comment separately
    const newComment = new Comment({
      product: productId,
      user: userId,
      text,
    });
 
    await newComment.save();
 
    res.status(201).json({ message: "Comment added", comment: newComment });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: error.message });
  }
};
 
module.exports = addComments;