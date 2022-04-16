const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  movie_name: { type: String, required: true },
  movie_genre: { type: String, required: true },
  production_year: { type: Number, required: true },
  budget: { type: Number, required: true },
});

module.exports = mongoose.model("movies", movieSchema);