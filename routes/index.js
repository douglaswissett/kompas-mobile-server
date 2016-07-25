var express = require('express');
var router = express.Router();

module.exports = function(LocationSchema, ensureAuthenticated) {
  router.get('/', function(req, res) {
    res.status(200);
    res.send('Welcome to Kompas');
  });
  router.get('/dashboard', function(req, res) {
    res.json(req.user);
  })
  router.get('/failedLogin', function(req, res) {
    res.send(req.flash('signupMessage'));
  })
  router.get('/denied', function(req, res) {
    res.status(401);
    res.send(req.flash('loginMessage'));
  });
  router.get('/logout', function(req, res){
    req.logout();
    res.send('Logged Successfully');
  });

  return router;
}

