const Device = require('../models/device');
const { sendRequest } = require('../utils/request');

module.exports = {
  getDevices,
  getDeviceById,
  addDevice,
  removeDevice,
  updateDevice,
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
    )
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
