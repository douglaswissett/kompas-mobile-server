var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LocationSchema   = new Schema({
  name: String,
  location: String,
  category: String,
  sub_category: String,
  foursquare_id: String,
  city: String,
  geo: {
    type: [Number],
    index: '2d'
  },
  latitude: Number,
  longitude: Number,
  related_ids: Number,
  description: String,
  meta_tags: String,
  photo_link: String
});

LocationSchema.statics.getNearbyPlaces = function ( coordinates, cb) {
  this.find({'geo': {$near: coordinates, $maxDistance: 1000/6371}}, cb)
}

module.exports = mongoose.model('LocationSchema', LocationSchema);
