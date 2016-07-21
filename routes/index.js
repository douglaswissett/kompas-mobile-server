var express = require('express');
var router = express.Router();

module.exports = function(LocationSchema, ensureAuthenticated) {
  router.get('/', function(req, res) {
    res.send('Index');
  });
  router.get('/home', function(req, res) {
    res.json(req.user)
  })
  router.get('/rejected', function(req, res) {
    res.status(401);
    res.send('Auth Failed')
  });
  // router.get('/login', function(req, res){
  //   res.send('Login')
  // });
  router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });

  return router;
}

