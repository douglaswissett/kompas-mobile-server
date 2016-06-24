var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var LocationSchema = require('./location_schema');

var Db_dump = new Schema({
  name: String,
  location: String,
  category: String,
  sub_category: String,
  foursquare_id: String,
  city: String,
  latitude: Number,
  longitude: Number,
  related_ids: Number,
  description: String,
  meta_tags: String,
  photo_link: String
}, { collection : 'db_dump' });   

Db_dump.statics.importData = function () {
  this.find({},function(err, places){
    if (err) throw err;
    places.forEach(function(place) {
      console.log('TEST PLACE: ', place.category);
      // Save location data
      var locationModel = new LocationSchema(); 
      locationModel.name = place.name;
      locationModel.location = place.location;
      locationModel.category = place.category;
      locationModel.sub_category = place.sub_category;
      locationModel.foursquare_id = place.foursquare_id;
      locationModel.city = place.city;
      locationModel.geo = [place.longitude, place.latitude];
      locationModel.latitude = place.latitude;
      locationModel.longitude = place.longitude;
      locationModel.related_ids = place.related_ids;
      locationModel.description = place.description;
      locationModel.meta_tags = place.meta_tags;
      locationModel.photo_link = place.photo_link;
      locationModel.save();
    });
  });
}

module.exports = mongoose.model('Db_dump', Db_dump);
