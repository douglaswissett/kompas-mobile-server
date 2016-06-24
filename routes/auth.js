var express = require('express');
var router = express.Router();

module.exports = function(passport, User) {
  router.get('/instagram',
    passport.authenticate('instagram'),
    function(req, res){
      // The request will be redirected to Instagram for authentication, so this
      // function will not be called.
  });
  router.get('/instagram/callback', 
    passport.authenticate('instagram',
    { failureRedirect: '/login' }),
    function(req, res) {
      res.redirect('/');
  });
  router.post('/register',  passport.authenticate('local', {
    successRedirect : '/', // redirect to the secure profile section
    failureRedirect : '/register', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));
  router.post('/login', passport.authenticate('local-login', {
      successRedirect : '/', // redirect to the secure profile section
      failureRedirect : '/login', // redirect back to the signup page if there is an error
      failureFlash : true // allow flash messages
  }));

  return router;
};
