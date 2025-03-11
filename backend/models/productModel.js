const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  recipeName: { type: String, required: true },
  category: { type: String, required: true },
  productImage: [{ type: String }],
  instructions: { type: String },
  ingredients: { type: String },
  ratings: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      rating: { type: Number, required: true }
    }
  ],
  averageRating: { type: Number, default: 0 } //  Store average rating
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
