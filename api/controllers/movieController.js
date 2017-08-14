'use strict';
var FormData = require('form-data');
var fetch = require('node-fetch');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var HttpClient = function() {
    this.get = function(aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() {
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }

        anHttpRequest.open( "GET", aUrl, true );
        anHttpRequest.send( null );
    }
}

var apiUrl = 'http://api.themoviedb.org/3';
var apiKey = 'api_key=802cd9bec58e75474a66bfa717fd1106';

var mongoose = require('mongoose'),
  Movie = mongoose.model('Movies');

exports.list_all_movies = function(req, res) {
  Movie.find({}, function(err, movie) {
    if (err)
      res.send(err);
    res.json(movie);
  });
};

exports.movies_trending = function(req, res) {
      var client = new HttpClient();
      client.get(apiUrl+'/discover/movie?'+apiKey, function(response) {
        res.json(JSON.parse(response));
      });
};

exports.movies_theaters = function(req, res) {
      var client = new HttpClient();
      client.get(apiUrl+'/movie/now_playing?'+apiKey, function(response) {
        res.json(JSON.parse(response));
      });
};

exports.movies_top = function(req, res) {
      var client = new HttpClient();
      client.get(apiUrl+'/movie/top_rated?'+apiKey, function(response) {
        res.json(JSON.parse(response));
      });
};

exports.movies_similar = function(req, res) {
    var client = new HttpClient();
    client.get(apiUrl+'/movie/'+req.params.movieId+'/similar?'+apiKey+'&append_to_response=videos', function(response) {
      res.json(JSON.parse(response));
    });
};

exports.movies_cast = function(req, res) {
    var client = new HttpClient();
    client.get(apiUrl+'/movie/'+req.params.movieId+'/casts?'+apiKey+'&append_to_response=videos', function(response) {
      res.json(JSON.parse(response));
    });
};

exports.movies_search = function(req, res) {
    console.log('holi');
    var client = new HttpClient();
    client.get(apiUrl+'/search/multi?'+apiKey+'&query='+req.params.term, function(response) {
      res.json(JSON.parse(response));
    });
};

exports.create_a_movie = function(req, res) {
  var new_movie = new Movie(req.body);
  new_movie.save(function(err, movie) {
    if (err) {
      res.send(err);
    }
    res.json(movie);
  });
};

exports.read_a_movie = function(req, res) {
  Movie.findById(req.params.movieId, function(err, movie) {
    if (err)
      res.send(err);
    res.json(movie);
  });
};

exports.search_a_movie = function(req, res) {
  Movie.findOne({ 'id': req.params.movieId}, function (err, movie) {
    if (err)
      res.send(err);
    if (movie) {
      res.json(movie);
    } else {
      var client = new HttpClient();
      client.get(apiUrl+'/movie/'+req.params.movieId+'?'+apiKey+'&append_to_response=videos', function(response) {
        res.json(JSON.parse(response));
      });
    }
  });
};

exports.update_a_movie = function(req, res) {
  Movie.findOneAndUpdate({_id: req.params.movieId}, req.body, {new: true}, function(err, movie) {
    if (err)
      res.send(err);
    res.json(movie);
  });
};


exports.delete_a_movie = function(req, res) {
  Movie.remove({
    _id: req.params.movieId
  }, function(err, movie) {
    if (err)
      res.send(err);
    res.json({ message: 'Movie successfully deleted' });
  });
};
