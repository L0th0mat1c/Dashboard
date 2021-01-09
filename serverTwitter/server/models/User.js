const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  first_name: { type: String},
  name: { type: String, required: true },

  password: { type: String},
  email: { type: String, unique : true},
  widgets: { type: Array},
});

module.exports = mongoose.model('User', userSchema);