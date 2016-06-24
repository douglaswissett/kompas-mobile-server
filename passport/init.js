var instagram = require('./instagram');
var local = require('./local');
var localLogin = require('./local-login');
var User = require('../models/user');

module.exports = function(passport){

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  // Setting up Passport Strategies for Instagram and Local
  instagram(passport);
  local(passport);
  localLogin(passport);
}