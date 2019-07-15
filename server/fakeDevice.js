const express = require('express');
const app = express();

const port = process.argv[2];

const COMMANDS = {
  'Power TOGGLE': 'toggle',
  'Power On': 'on',
  'Power off': 'off',
};

let deviceState = 'off';

app.get('/cm', async (req, res) => {
  const command = COMMANDS[req.query.cmnd];

  if (command === 'on') {
    deviceState = 'on';
  } else if (command === 'off') {
    deviceState = 'off';
  } else if (command === 'toggle') {
    deviceState = deviceState === 'on' ? 'off' : 'on';
  };

  console.log(`Recived "${command}" command, current state is "${deviceState}"`);
  res.send(deviceState);
});

app.listen(port, () => {
  console.log(`Fake device is listenin on http://127.0.0.1:${port}`);
});