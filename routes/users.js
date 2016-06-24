var express = require('express');
var router = express.Router();
var Db_dump = require('../models/db_dump');

module.exports = function(User, LocationSchema) {
  // display all users
  router.get('/', function(req, res) {
    User.find({}, function(err, users){
      res.render('show_users.jade', { data: users, title: 'Users', user: req.user });
    });
  });
  // send all users in json format
  router.get('/json', function(req, res) {
    User.find({}, function(err, users) {
      res.json(users);
    });
  });
  // render google map
  router.get('/map', function(req, res) {
    User.findOne({username: req.user.username}, function(err, user) {
      LocationSchema.getNearbyPlaces( user.geo , function(err, locations) {
        if (err) throw err;
        res.render('show_map.jade', { user: req.user, locations: locations });
      })
    })
  });
  // update user location coordinates
  router.post('/getLocation', function(req, res) {
    User.updateLocation(req.user.username, [ req.body.lng, req.body.lat ]);
    res.status(200);
  });
  // display user profile
  router.get('/:username', function(req, res) {
    User.findOne({ 'username' : req.params.username }, function(err, user){
      if (err) throw err;
      res.render('show_profile.jade', { profile: user, user: req.user });
    });
  });

  return router;
};
