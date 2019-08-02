const Device = require('../models/device');
const updateDeviceStatus = require('../utils/updateDeviceStatus');

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
    );
  }

  Device.findByIdAndUpdate(deviceId, data).exec();
};



module.exports = {
  getDevices,
  getDeviceById,
  addDevice,
  removeDevice,
  updateDevice,
};