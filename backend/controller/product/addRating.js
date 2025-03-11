const Product = require("../../models/productModel"); //  Import Product model

const addRating = async (req, res) => {
  const { rating } = req.body;
  const userId = req.userId; //  Authenticated user ID
  const { productId } = req.params;

  try {
    const product = await Product.findById(productId); //  Correct fetching

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if user already rated
    const existingRating = product.ratings.find(
      (r) => r.userId.toString() === userId
    );

    if (existingRating) {
      existingRating.rating = rating; //  Update existing rating
    } else {
      product.ratings.push({ userId, rating }); //  Add new rating
    }

    //  Recalculate average rating
    product.averageRating =
      product.ratings.reduce((acc, r) => acc + r.rating, 0) /
      product.ratings.length;

    await product.save();

    res.status(200).json({ message: "Rating submitted", product });
  } catch (error) {
    res.status(500).json({ message: "Failed to submit rating", error });
  }
};

module.exports = addRating;
