const Group = require('../models/group');
const Device = require('../models/device');
const updateDeviceStatus = require('../utils/updateDeviceStatus');
const logService = require('./log');

const groupAdapter = ({
  _id,
  name,
  state,
  devices,
}) => ({
    id: _id,
    name,
    state,
    devices,
});

async function getGroups() {
  const groups = await Group.find({}).exec();
  return groups.map(groupAdapter);
};

async function getGroupById(groupId) {
  const group = await Group.findById(groupId).exec();
  if (group) {
    return groupAdapter(group);
  } else {
    return null;
  }
};

async function addGroup({ name, devices }) {
  const group = new Group({
    state: 'off',
    name,
    devices
  });

  await group.save();
};

async function removeGroup(groupId) {
  await Group.findByIdAndDelete(groupId).exec();
};

async function updateGroup(groupId, data) {
  const group = await Group.findById(groupId).exec();
  if (!group) {
    return null;
  };

  console.log(groupId, data);

  if (data.state) {
    const devices = await Promise.all(
      group.devices.map(async deviceId => await Device.findById(deviceId).exec())
    );

    await Promise.all(
      devices.map(async device => await updateDeviceStatus(
        device.address,
        device.port,
        data.state
      ))
    );

    await Promise.all(
      devices.map(async device => await Device.findByIdAndUpdate(device._id, {state: data.state}).exec())
    );

    await Promise.all(
      group.devices.map(async deviceId => await logService.addLog(deviceId, data.state))
    )

  }

  Group.findByIdAndUpdate(groupId, data).exec();
};

module.exports = {
  getGroups,
  getGroupById,
  addGroup,
  removeGroup,
  updateGroup,
};