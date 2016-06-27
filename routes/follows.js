var express = require('express');
var router = express.Router();

module.exports = function(User) {
  
  router.get('/', function(req, res) {});

  // post follow / follower relationship
  router.post('/', function(req, res) {
    // Date Now
    var date = Date();
    // follower object to be pushed into following array of user
    var follower_profile = {
      username: req.body.username,
      followed_at: date
    }
    var follow_profile = {
      username: req.user.username,
      followed_since: date
    }

    User.count({username: req.user.username,following: {$elemMatch: {username: req.body.username}}}, function(err, count){
      // check if already following
      if(count > 0) {
        req.flash('alreadyFollow', 'Already following '+req.body.username)
        res.redirect('/api/v1/users/' + req.body.username);
      } else {
        // add following username to follower
        User.update({username: req.user.username},{$push: { following: follower_profile }}, 
        function(err){
          if (err) throw err;
          // add follower username to following
          User.update({username: req.body.username},{$push: { followers: follow_profile }}, 
          function(err){
            if (err) throw err;
            res.redirect('/api/v1/users/' + req.body.username);
          })
        })
      }
    })
  })
  // post unfollow / unfollower relationship
  router.post('/unfollows', function(req, res) {
    User.update({username: req.user.username},{$pull: { following: {username: req.body.username}}}, function(err) {
      if (err) throw err;
      User.update({username: req.body.username},{$pull: { followers: {username: req.user.username}}}, function(err) {
        if (err) throw err;
        res.redirect('/api/v1/users/' + req.body.username);
      })
    })
  })

  return router;
};
