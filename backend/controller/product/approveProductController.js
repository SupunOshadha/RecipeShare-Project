const productModel = require("../../models/productModel");

const approveProductController = async (req, res) => {
  try {
    const { id } = req.body; // Get product ID from request

    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      { status: "approved" },
      { new: true }
    );

    res.json({
      message: "Product approved successfully",
      success: true,
      data: updatedProduct,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || "Failed to approve product",
      error: true,
    });
  }
};

module.exports = approveProductController;
