const schedule = require('node-schedule');
const { port, env } = require('./config/vars');
const app = require('./config/express');
const mongoose = require('./config/mongoose');
const { setItems, setExchangeRates } = require('./api/services/cache');

mongoose.connect();

const rule = new schedule.RecurrenceRule();
rule.hour = 0;
rule.minute = 0;

schedule.scheduleJob(rule, async () => {
  await Promise.all([setItems(), setExchangeRates()]);
});

Promise.all([setItems(), setExchangeRates()]).then(() => {
  app.listen(port, () => {
    console.info(`server started on port ${port} (${env})`);
  });
});

module.exports = app;
