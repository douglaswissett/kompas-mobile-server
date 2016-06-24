var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

module.exports = function(passport) {
  // Passport-Local
  passport.use('local', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  },
  function(req, email, password, done) {
    process.nextTick(function() {
      // find a user whose email is the same as the forms email
      // we are checking to see if the user trying to login already exists
      User.findOne({ 'email' :  email }, function(err, user) {
          // if there are any errors, return the error
          if (err) {
            return done(err);
          }
          // check to see if theres already a user with that email
          if (user) {
            return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
          } else {
            // if there is no user with that email
            // create the user
            var user = new User();
            user.email = email;
            user.username = email;
            user.first_name = req.body.first_name;
            user.last_name = req.body.last_name;
            user.password = user.generateHash(password);
            user.save(function(err) {
              if (err) {
                throw err;
              }
              return done(null, user);
            });
          }
      });
    });
  }));
};


