const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    recipeName: String,
    category: String,
    productImage: [],
    instructions: String,
    ingredients: String,
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const productModel = mongoose.model("product", productSchema);

module.exports = productModel;
