var express = require('express');
var router = express.Router();

module.exports = function(Categories, LocationSchema, User) {
  router.get('/', function(req, res) {
    Categories.find({}, function(err, categories) {
      if (err) console.error(err);
      res.render('show_categories', { categories: categories, user: req.user, message: req.flash('savedCategories')})
    })
  });

  router.get('/stored', function(req, res) {
    User.findOne({username: req.user.username}, {categories: 1}, function(err, stored_categories) {
      if (err) throw err;
      res.send(stored_categories.categories);
    })
  });

  router.get('/:category_name', function(req, res) {
    LocationSchema.find({ category: req.params.category_name }, function(err, matched_categories) {
      if (err) console.error(err);
      res.render('show_map', {  locations: matched_categories, user: req.user })
    })
  });

  router.post('/addto/:username', function(req, res) {
    User.update({username: req.params.username}, {categories: req.body.category_cbox}, function(err) {
      if (err) throw err;
      req.flash('savedCategories', 'Saved categories')
      res.redirect('/api/v1/categories');
    })
  });

  return router;
};
