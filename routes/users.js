var express = require('express');
var router = express.Router();
var Db_dump = require('../models/db_dump');
var ObjectId = require('mongodb').ObjectId; 

module.exports = function(User, LocationSchema) {
  // display all users
  router.get('/', function(req, res) {
    User.find({}, function(err, users) {
      res.json(users);
    });
  });
  // display one user
  router.get('/:uid', (req, res) => {

    User.findById(req.params.uid, function(err, user) {
      if(err) console.error(err);

      res.json(user);
    });
  });

  return router;
};
