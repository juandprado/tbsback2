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
  People = mongoose.model('Peoples');

exports.peoples_trending = function(req, res) {
      var client = new HttpClient();
      client.get(apiUrl+'/person/popular?'+apiKey, function(response) {
        res.json(JSON.parse(response));
      });
};

exports.peoples_cast = function(req, res) {
    var client = new HttpClient();
    client.get(apiUrl+'/person/'+req.params.peopleId+'/movie_credits?'+apiKey+'&append_to_response=videos', function(response) {
      res.json(JSON.parse(response));
    });
};

exports.search_a_people = function(req, res) {
  People.findOne({ 'id': req.params.peopleId}, function (err, people) {
    console.log('tiki');
    if (err)
      res.send(err);
    if (people) {
      res.json(people);
    } else {
      var client = new HttpClient();
      client.get(apiUrl+'/person/'+req.params.peopleId+'?'+apiKey+'&append_to_response=videos', function(response) {
        res.json(JSON.parse(response));
      });
    }
  });
};
