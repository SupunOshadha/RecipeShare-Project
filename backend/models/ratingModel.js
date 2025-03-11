const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  recipeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' },
  rating: { type: Number, required: true }
});

const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;


