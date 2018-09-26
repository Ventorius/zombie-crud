const Joi = require('joi');

module.exports = {

  listZombies: {
    query: {
      page: Joi.number().min(1),
      perPage: Joi.number().min(1).max(100),
    },
  },

  createZombie: {
    body: {
      name: Joi.string().required().max(128),
      items: Joi.array().items(Joi.number().min(1).max(15)).max(5),
    },
  },

};
