var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var passportLocalMongoose = require('passport-local-mongoose');
var bcrypt   = require('bcrypt-nodejs');

var userSchema = new Schema({
  username     : String,
  first_name   : String,
  last_name    : String,
  email        : String,
  password     : String,
  bio          : String,
  location     : String,
  visits       : [],
  instagram_id : String,
  profile_picture : String,
  geo: {
    type: [Number],
    index: '2d'
  },
});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.statics.updateLocation = function( username , coordinates) {
  this.update({ username: username }, { geo: coordinates }, function(err) {
    if (err) throw err;
  })
}


// userSchema.plugin(passportLocalMongoose);

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
