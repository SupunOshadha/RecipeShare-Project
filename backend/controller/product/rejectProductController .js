const productModel = require("../../models/productModel");

const rejectProductController = async (req, res) => {
  try {
    const { productId } = req.params;

    await productModel.findByIdAndDelete(productId);

    res.json({
      message: "Product rejected and deleted successfully",
      success: true,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || "Failed to reject product",
      error: true,
    });
  }
};

module.exports = rejectProductController;
