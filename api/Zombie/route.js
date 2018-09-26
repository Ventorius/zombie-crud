const express = require('express');
const validate = require('express-validation');
const controller = require('./controller');
const { listZombies, createZombie } = require('./validations');

const router = express.Router();

router
  .route('/')
  .get(validate(listZombies), controller.list)
  .post(validate(createZombie), controller.create);

router
  .route('/:zombieId')
  .get(controller.get);

module.exports = router;
