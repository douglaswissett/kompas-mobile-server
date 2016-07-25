var express = require('express');
var router = express.Router();

module.exports = function(Interests) {
  router.get('/', function(req, res) {
    Interests.find({}, function(err, interests) {
      if (err) console.error(err);
      res.json(interests)
    })
  });

  return router;
};
