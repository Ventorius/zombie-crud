const httpStatus = require('http-status');
const request = require('supertest');
const { expect } = require('chai');
const app = require('../../index');
const Zombie = require('../Zombie/model');

describe('Zombie API', async () => {
  beforeEach(async () => {
    const zombies = {
      branStark: {
        name: 'Bran Stark',
      },
      jonSnow: {
        name: 'Jon Snow',
      },
    };

    await Zombie.remove({});
    await Zombie.insertMany([zombies.branStark, zombies.jonSnow]);
  });

  describe('GET /zombies', () => {
    it('should get zombies', () => request(app)
      .get('/api/zombies')
      .expect(httpStatus.OK)
      .then((res) => {
        console.log(res.body);
        expect(res.body).to.be.a('array');
        expect(res.body).to.have.lengthOf(2);
      }));
  });

  describe('POST /zombies', () => {
    it('should create new zombie if request is ok', () => request(app)
      .post('/api/zombies')
      .send({ name: 'test' })
      .expect(httpStatus.CREATED)
      .then((res) => {
        expect(res.body).to.have.property('name');
        expect(res.body).to.have.property('items');
        expect(res.body).to.have.property('createdAt');
      }));
  });

  describe('POST /zombies', () => {
    it('should not created zombie if name is not given', () => request(app)
      .post('/api/zombies')
      .send({})
      .expect(httpStatus.BAD_REQUEST)
      .then((res) => {
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('code');
        expect(res.body).to.have.property('errors');
        expect(res.body.message).to.equal('validation error');
        expect(res.body.code).to.equal(400);
      }));
  });
});
