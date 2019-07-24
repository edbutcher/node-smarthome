const mongoose = require('mongoose');

const Log = mongoose.model('Log', {
  deviceId: String,
  action: String,
  date: {
    type: Date,
    default: Date.now
  },
});

module.exports = Log;
