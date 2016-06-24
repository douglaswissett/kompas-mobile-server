var express = require('express');
var router = express.Router();

module.exports = function(User, LocationSchema) {
  // display all locations
  router.get('/', function(req, res) {

  });
  // send locations in json format
  router.get('/json', function(req, res) {

  });
  // get nearby locations based on user location
  router.get('/nearby', function(req, res) {
    User.findOne({username: req.user.username}, function(err, user) {

      LocationSchema.getNearbyPlaces( user.geo , function(err, locations) {
        if (err) throw err;
        res.json(locations);
      })
    })
  });
  // display location info
  router.get('/:location_id', function(req, res) {
    LocationSchema.findOne({ _id: req.params.location_id }, function(err, location) {
      res.render('show_location', { location: location, user: req.user });
    })
  });

  return router;
};
