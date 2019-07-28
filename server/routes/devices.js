const express = require('express');
const devicesService = require('../services/devices');
const logService = require('../services/log');

const router = express.Router();

router.get('/', async (req, res) => {
    const devices = await devicesService.getDevices();
    res.json(devices);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const device = await devicesService.getDeviceById(id);

  if (device) {
    res.json(device);
  } else {
    res.sendStatus(404);
  }
})

router.post('/', async (req, res) => {
  const { name, address, port } = req.body;
  await devicesService.addDevice({
    name,
    address,
    port,
  });

  res.sendStatus(201);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await devicesService.removeDevice(id);

  res.sendStatus(200);
})

router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const deviceData = req.body;

  try {
    await devicesService.updateDevice(id, deviceData);
    await logService.addLog(id, deviceData.state);

    res.sendStatus(200);
  } catch {
    res.sendStatus(500);
  }
})

module.exports = router;
