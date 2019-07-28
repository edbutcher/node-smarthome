const express = require('express');
const groupService = require('../services/groups');

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
  const { name, state, devices } = req.body;
  await groupService.addGroup({
    name,
    state,
    devices,
  });

  res.sendStatus(201);
});

module.exports = router;
