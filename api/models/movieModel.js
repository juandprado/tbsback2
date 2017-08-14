'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var MovieSchema = new Schema({
  id: Number,
  title: String,
  vote_average: Number,
  release_date: String,
  runtime: Number,
  original_language: String,
  budget: Number,
  revenue: Number,
  overview: String,
  poster_path: String,
  genres: [String],
  videos: {
    results: [{
      id: String,
      iso_639_1: String,
      iso_3166_1: String,
      key: String,
      name: String,
      site: String,
      size: Number,
      type: String
    }]
  }
});

module.exports = mongoose.model('Movies', MovieSchema);
