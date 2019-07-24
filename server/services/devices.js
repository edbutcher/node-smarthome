const Device = require('../models/device');
const Log = require('../models/log');
const { sendRequest } = require('../utils/request');

module.exports = {
  getDevices,
  getDeviceById,
  addDevice,
  removeDevice,
  updateDevice,
  getLogById,
};

const deviceAdapter = ({
  _id,
  name,
  address,
  port,
  state
}) => ({
    id: _id,
    name,
    address,
    port,
    state,
});

const logAdapter = ({
  deviceId,
  action,
  date,
}) => ({
  deviceId,
  action,
  date,
});

async function getDevices() {
  const devices = await Device.find({}).exec();
  return devices.map(deviceAdapter);
};

async function getDeviceById(deviceId) {
  const device = await Device.findById(deviceId).exec();
  if (device) {
    return deviceAdapter(device);
  } else {
    return null;
  }
};

async function addDevice(deviceData) {
  const device = new Device({
    state: 'off',
    ...deviceData,
  });

  await device.save();
};

async function removeDevice(deviceId) {
  await Device.findByIdAndDelete(deviceId).exec();
};

async function updateDevice(deviceId, data) {
  const device = await Device.findById(deviceId).exec();

  if (!device) {
    return null;
  };

  if (data.state) {
    await updateDeviceStatus(
      device.address,
      device.port,
      data.state
    );
    await setLogById(deviceId, data.state);
  }

  Device.findByIdAndUpdate(deviceId, data).exec();
};

async function updateDeviceStatus(address, port, state) {
  const command = state === 'off'
    ? 'Power off'
    : 'Power On';
  const url = `http://${address}:${port}/cm?cmnd=${command}`;

  await sendRequest(url);
};

async function setLogById(deviceId, action) {
  const logs = new Log({
    deviceId,
    action,
  });

  await logs.save();
};

async function getLogById(deviceId) {
  const logs = await Log.find({ deviceId }).exec();
  return logs.map(logAdapter);
};
