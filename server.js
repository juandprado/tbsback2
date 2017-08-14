var cors = require('cors');

var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Movie = require('./api/models/movieModel'),
  People = require('./api/models/peopleModel'),
  bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://juand:juand@ds151108.mlab.com:51108/heroku_7jn1xvvz');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/movieRoutes');
var routesPeople = require('./api/routes/peopleRoutes');
routes(app);
routesPeople(app);


app.listen(port);


console.log('todo list RESTful API server started on: ' + port);
