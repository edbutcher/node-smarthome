const express = require('express');
const groupService = require('../services/groups');
const logService = require('../services/log');

const router = express.Router();

router.get('/', async (req, res) => {
  const groups = await groupService.getGroups();

  res.json(groups);
})

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const group = await groupService.getGroupById(id);

  res.json(group);
})

router.post('/', async (req, res) => {
  const { name, devices } = req.body;
  console.log(req.body);

  await groupService.addGroup({
    name,
    devices,
  });

  res.sendStatus(201);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await groupService.removeGroup(id);

  res.sendStatus(200);
})

router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const groupData = req.body;

  try {
    await groupService.updateGroup(id, groupData);
    await logService.addLog(id, groupData.state);

    res.sendStatus(200);
  } catch {
    res.sendStatus(500);
  }
})

module.exports = router;
