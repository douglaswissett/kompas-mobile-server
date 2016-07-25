var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var InterestsSchema   = new Schema({
  name: String,
  description: String,
  photo_link: String
});

module.exports = mongoose.model('Interests', InterestsSchema);
