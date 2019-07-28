const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Device = require('./device');

const Group = mongoose.model('Group', {
  name: String,
  state: String,
  devices: [{ type: Schema.Types.ObjectId, ref: Device}],
});

module.exports = Group;
