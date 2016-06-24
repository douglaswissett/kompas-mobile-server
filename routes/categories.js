var express = require('express');
var router = express.Router();

module.exports = function(Categories, LocationSchema) {
  router.get('/', function(req, res) {
    Categories.find({}, function(err, categories) {
      if (err) console.error(err);
      res.render('show_categories', { categories: categories, user: req.user})
    })
  });

  router.get('/:category_name', function(req, res) {
    LocationSchema.find({ category: req.params.category_name }, function(err, matched_categories) {
      if (err) console.error(err);
      res.render('show_map', {  locations: matched_categories, user: req.user })
    })
  });

  return router;
};
