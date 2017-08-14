'use strict';
module.exports = function(app) {
  var people = require('../controllers/peopleController');

  app.route('/people/:peopleId')
    .get(people.search_a_people);

  app.route('/people-trending')
    .get(people.peoples_trending);

  app.route('/people-cast/:peopleId')
    .get(people.peoples_cast);
};
