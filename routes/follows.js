var express = require('express');
var router = express.Router();

module.exports = function(User) {
  
  router.get('/', function(req, res) {});

  router.post('/', function(req, res) {

    var follow_profile = {
      username: req.body.username,
      followed_at: Date()
    }

    User.count({username: req.user.username,following: {$elemMatch: {username: req.body.username}}}, function(err, count){
      if(count > 0) {
        req.flash('alreadyFollow', 'Already following '+req.body.username)
        res.redirect('/api/v1/users/' + req.body.username);
      } else {    
        User.update({username: req.user.username},{$push: { following: follow_profile }}, 
        function(err){
          if (err) throw err;
          res.redirect('/api/v1/users/' + req.body.username);
        })
      }
    })
  })

  return router;
};
