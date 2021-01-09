const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String},
  facebookId: {type: String},
  widgets: { type: Array},

});

module.exports = mongoose.model('User', userSchema);