const Group = require('../models/group');
// const { sendRequest } = require('../utils/request');

const groupAdapter = ({
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

async function addGroup(groupData) {
  const group = new Group({
    state: 'off',
    ...groupData,
  });

  await group.save();
};

// async function removeDevice(deviceId) {
//   await Device.findByIdAndDelete(deviceId).exec();
// };

// async function updateDevice(deviceId, data) {
//   const device = await Device.findById(deviceId).exec();

//   if (!device) {
//     return null;
//   };

//   if (data.state) {
//     await updateDeviceStatus(
//       device.address,
//       device.port,
//       data.state
//     );
//   }

//   Device.findByIdAndUpdate(deviceId, data).exec();
// };

// async function updateDeviceStatus(address, port, state) {
//   const command = state === 'off'
//     ? 'Power off'
//     : 'Power On';
//   const url = `http://${address}:${port}/cm?cmnd=${command}`;

//   await sendRequest(url);
// };

module.exports = {
  getGroups,
  getGroupById,
  addGroup,
  // removeDevice,
  // updateDevice,
};