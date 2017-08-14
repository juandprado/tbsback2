'use strict';
module.exports = function(app) {
  var movie = require('../controllers/movieController');


  // movie Routes
  app.route('/movies')
    .get(movie.list_all_movies)
    .post(movie.create_a_movie);

  app.route('/movies/:movieId')
    .get(movie.search_a_movie)
    .put(movie.update_a_movie)
    .delete(movie.delete_a_movie);

  app.route('/movies-trending')
    .get(movie.movies_trending);

  app.route('/movies-theaters')
    .get(movie.movies_theaters);

  app.route('/movies-top')
    .get(movie.movies_top);

  app.route('/movies-similar/:movieId')
    .get(movie.movies_similar);

  app.route('/movies-cast/:movieId')
    .get(movie.movies_cast);

  app.route('/movies-search/:term')
    .get(movie.movies_search);
};
