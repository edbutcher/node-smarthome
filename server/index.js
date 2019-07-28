const exprees = require('express');
const mongoose = require('mongoose');
const corsMiddleware = require('./middlewares/cors');
const devicesRouter = require('./routes/devices');
const groupsRouter = require('./routes/groups');
const logRouter = require('./routes/log');

const app = exprees();
const PORT = 4000;

mongoose.connect('mongodb://localhost:27017/node-workshop-4', {useNewUrlParser: true});

app.use(exprees.json());
app.use(corsMiddleware);

app.use('/devices', devicesRouter);
app.use('/log', logRouter);
app.use('/groups', groupsRouter);

app.get('/', (req, res) => {
  res.json({result: 'ok ok'});
});

app.listen(PORT, () => {
  console.log(`Server is listrning on http://localhost:${PORT}`)
});
