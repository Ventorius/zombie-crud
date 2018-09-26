const express = require('express');
const validate = require('express-validation');
const controller = require('./controller');
const { listZombies, createZombie } = require('./validations');

const router = express.Router();

router
  .route('/')
  /**
   * @api {get} api/zombies List Zombies
   * @apiDescription Get a list of Zombies
   * @apiVersion 1.0.0
   * @apiName ListZombies
   * @apiGroup Zombies
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [perPage=1]  Users per page
   *
   * @apiSuccess {Array} zombies List of zombies.
   *
   * @apiError (Not found 404)  Zombies Couldn't be found
   */
  .get(validate(listZombies), controller.list)
  /**
   * @api {post} api/zombies Create Zombie
   * @apiDescription Create a new zombie
   * @apiVersion 1.0.0
   * @apiName CreateZombie
   * @apiGroup Zombies
   *
   * @apiParam  {String}             name     Zombie's name
   * @apiParam  {Array}             [items]     Zombie's items in form of id's, maximum 5 of these
   *
   * @apiSuccess (Created 201) {String}  id         Zombie's id
   * @apiSuccess (Created 201) {String}  name       Zombie's name
   * @apiSuccess (Created 201) {String}  items      Zombie's items
   * @apiSuccess (Created 201) {String}  createdAt  Timestamp
   * @apiSuccess (Created 201) {Date}    updatetAt  Timestamp
   *
   * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
   * @apiError (Internal Server Error 500) Something happened while inserting data
   */
  .post(validate(createZombie), controller.create);

router
  .route('/:zombieId')
  /**
   * @api {get} api/zombies/:id Get Zombie
   * @apiDescription Get zombie information
   * @apiVersion 1.0.0
   * @apiName GetZombie
   * @apiGroup Zombie
   *
   * @apiSuccess (Created 201) {String}  id         Zombie's id
   * @apiSuccess (Created 201) {String}  name       Zombie's name
   * @apiSuccess (Created 201) {String}  items      Zombie's items
   * @apiSuccess (Created 201) {String}  createdAt  Timestamp
   * @apiSuccess (Created 201) {Date}    updatetAt  Timestamp
   *
   * @apiError (Not Found 404)    NotFound     Zombie does not exist
   */
  .get(controller.get);

module.exports = router;
