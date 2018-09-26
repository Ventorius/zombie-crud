const express = require('express');
const bodyParser = require('body-parser');
const routes = require('../api/Zombie/route');
const error = require('../api/middlewares/error');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/zombies', routes);

app.use(error.converter);
app.use(error.notFound);
app.use(error.handler);

module.exports = app;
