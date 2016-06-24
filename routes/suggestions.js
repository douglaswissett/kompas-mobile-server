var express = require('express');
var router = express.Router();


// search location
var location = {
  lat: 52.5200,
  long: 13.4050
}

module.exports = function(request) {

  router.get('/', function(req, res) {
    request(`https://api.foursquare.com/v2/venues/explore?client_id=${process.env.FS_ID}
      &client_secret=${process.env.FS_SECRET}
      &v=20130815&ll=${location.lat},${location.long}`,
      function (error, response, body) {
        if (error) throw err;

        var parsed = JSON.parse(body);

        res.render('show_suggestions.jade', {
          title: 'Places',
          current_location: parsed.response.headerFullLocation,
          description :'Using Foursquare Venue / Explore API',
          data: parsed.response.groups[0].items
        });
    });
  });

  router.get('/json', function(req, res) {
    request(`https://api.foursquare.com/v2/venues/explore?client_id=${process.env.FS_ID}
      &client_secret=${process.env.FS_SECRET}
      &v=20130815&ll=${location.lat},${location.long}`,
      function (error, response, body) {
        if (error) throw error;

        res.send(JSON.parse(body));
    });
  });

  return router;
};
