var express = require('express');
var router = express.Router();

module.exports = function(User, LocationSchema) {
  // display all locations
  router.get('/', function(req, res) {
    LocationSchema.find({}, function(err, locations) {
      res.render('show_map', {locations: locations, user: req.user});
    }).sort({name: 1});
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
  // get recommended locations based on user categories
  router.get('/recommended', function(req, res) {
    var query_collection = [];
    User.findOne({username: req.user.username}, {categories: 1}, function(err, stored_categories) {
      if (err) throw err;

      if (stored_categories.categories == null) return;

      stored_categories.categories.forEach(function(category) {
        console.log('TEST FAIL');
        LocationSchema.find({category: category}, function(err, locations) {
          locations.forEach(function(location) {
            query_collection.push(location);
          })
        })
      })
    })
    // allow time for forEach to complete, need a better solution
    setTimeout(function(){
      res.render('show_map', {locations: query_collection, user: req.user});
    },1000);
  })
  // display profile of location
  router.get('/:location_id', function(req, res) {
    LocationSchema.findOne({ _id: req.params.location_id }, function(err, location) {
      res.render('show_location', { location: location, user: req.user });
    })
  });

  return router;
};
