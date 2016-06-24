var express = require('express');
var router = express.Router();

module.exports = function(LocationSchema, ensureAuthenticated) {
  router.get('/', function(req, res) {
    res.render('index', { 
      title: 'KOMPAS',
      user: req.user
    })
  });
  router.get('/register', function(req, res) {
    res.render('register', { message: req.flash('signupMessage') });
  });
  router.get('/login', function(req, res){
    res.render('login', { 
      user: req.user,
      message: req.flash('loginMessage')
    })
  });
  router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });

  return router;
}

