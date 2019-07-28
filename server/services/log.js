
const Log = require('../models/log');

const logAdapter = ({
  deviceId,
  deviceName,
  action,
  date,
}) => ({
  deviceId,
  deviceName,
  action,
  date,
});

async function getLog() {
  const log = await Log.find({}).exec();
  return log.map(logAdapter);
};

async function getLogByDeviceId(deviceId) {
  const log = await Log.find({ deviceId }).exec();
  return log.map(logAdapter);
};

async function getLogByGroupId(groupId) {
  // TODO Log.find({ deviceId_1, deviceId_2...})
}

async function addLog(deviceId, action) {
  const log = new Log({
    deviceId,
    action,
  });

  await log.save();
};

module.exports = {
  getLog,
  getLogByDeviceId,
  getLogByGroupId,
  addLog,
};