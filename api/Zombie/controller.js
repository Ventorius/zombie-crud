const httpStatus = require('http-status');
const Zombie = require('./model');

exports.create = async (req, res) => {
  try {
    const zombie = new Zombie(req.body);
    const savedZombie = await zombie.save();
    res.status(httpStatus.CREATED);
    res.json(savedZombie);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR);
    res.json({ error: httpStatus.INTERNAL_SERVER_ERROR });
  }
};

exports.get = async (req, res, next) => {
  try {
    const zombie = await Zombie.get(req.params.zombieId);
    res.status(httpStatus.OK);
    res.json(zombie.transform());
  } catch (error) {
    res.status(httpStatus.NOT_FOUND);
    res.json({ error: httpStatus.NOT_FOUND });
  }
};

exports.list = async (req, res, next) => {
  try {
    const zombies = await Zombie.list(req.query);
    res.json(zombies.map(zombie => zombie.transform()));
  } catch (error) {
    next(error);
  }
};
