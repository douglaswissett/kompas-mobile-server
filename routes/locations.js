var express = require('express');
var router = express.Router();

module.exports = function(User, LocationSchema) {
  // display all locations
  router.get('/', function(req, res) {
    LocationSchema.find({}, function(err, locations) {
      res.render('show_map', {locations: locations, user: req.user});
    })
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

  router.get('/recommended', function(req, res) {
    var query_collection = [];
    User.findOne({username: req.user.username}, {categories: 1}, function(err, stored_categories) {
      if (err) throw err;

      function recursiveStored(i, collection) {
        if (i == collection.length) return;

        LocationSchema.find({category: collection[i]}, function(err, locations) {
          function recursivePushLocation(j, data) {
            if(j == data.length) return;

            query_collection.push(data[j]);
            j++;
            recursivePushLocation(j, data)
          }
          i++
          recursiveStored(i, collection);
        })
      }

      // stored_categories.categories.forEach(function(category) {
      //   LocationSchema.find({category: category}, function(err, locations) {
      //     locations.forEach(function(location) {
      //       query_collection.push(location);
      //     })
      //   })
      // })
    })
    
    console.log(query_collection);
    // res.render('show_map', {locations: query_collection, user: req.user});
  })

  // display profile of location
  router.get('/:location_id', function(req, res) {
    LocationSchema.findOne({ _id: req.params.location_id }, function(err, location) {
      res.render('show_location', { location: location, user: req.user });
    })
  });

  return router;
};
