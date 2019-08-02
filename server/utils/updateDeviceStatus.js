const { sendRequest } = require('./request');

async function updateDeviceStatus(address, port, state) {
  const command = state === 'off'
    ? 'Power off'
    : 'Power On';
  const url = `http://${address}:${port}/cm?cmnd=${command}`;

  await sendRequest(url);
};

module.exports = updateDeviceStatus;