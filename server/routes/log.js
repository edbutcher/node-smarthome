const express = require('express');
const logService = require('../services/log');

const router = express.Router();

router.get('/', async (req, res) => {
  const log = await logService.getLog();

  res.json(log);
})

router.get('/devices/:id', async (req, res) => {
  const { id } = req.params;
  const log = await logService.getLogByDeviceId(id);

  res.json(log);
})

router.get('/groups/:id', async (req, res) => {
  const { id } = req.params;
  const log = await logService.getLogByGroupId(id);

  res.json(log);
})

module.exports = router;
