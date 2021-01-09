const mongoose = require('mongoose');

const widgetSchema = mongoose.Schema({
  name: { type: String, required: true },
});

module.exports = mongoose.model('Widget', widgetSchema);