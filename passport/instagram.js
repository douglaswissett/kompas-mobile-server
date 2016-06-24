var InstagramStrategy = require('passport-instagram').Strategy;
var User = require('../models/user');


module.exports = function(passport) {
  passport.use(new InstagramStrategy({
      clientID: process.env.IG_ID,
      clientSecret: process.env.IG_SECRET,
      callbackURL: "http://localhost:3000/auth/instagram/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      // asynchronous verification, for effect...
      process.nextTick(function () {
        User.count({instagram_id: profile.id}, function (err, count){ 
          if (err) throw err;

          if(count>0){
            //document exists });
            return done(null, profile);
          }

          var full_name = profile._json.data.full_name.split(' ');
          // create new user record
          var user = new User({
            username: profile.username,
            email : profile.username,
            first_name : full_name[0],
            last_name : full_name[1],
            instagram_id: profile.id,
            bio  : profile._json.data.bio,
            profile_picture: profile._json.data.profile_picture
          });
          // save user record to MongoDB
          user.save(function(err, user) {
            if (err) throw err;
            return done(null, profile);
          });
        });
        // To keep the example simple, the user's Instagram profile is returned to
        // represent the logged-in user.  In a typical application, you would want
        // to associate the Instagram account with a user record in your database,
        // and return that user instead.
      });
    }
  ));
};