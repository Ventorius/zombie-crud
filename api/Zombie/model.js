const mongoose = require('mongoose');
const { omitBy, isNil } = require('lodash');
const httpStatus = require('http-status');
const APIError = require('../utils/APIError');
const { getMarketData, getExchangeRates } = require('../services/cache');

function itemsArrayLimit(val) {
  return val.length <= 5;
}

const zombieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  items: {
    type: [Number],
    validate: [itemsArrayLimit, '{PATH} exceeds the limit of 5'],
    default: [],
  },
}, {
  timestamps: true,
});

zombieSchema.method({
  transform() {
    const market = getMarketData();
    const { eur, usd } = getExchangeRates();

    const transformed = {};

    transformed.createdAt = this.createdAt;
    transformed.name = this.name;
    transformed.items = this.items.map(item => market.items.find(marketItem => marketItem.id === item));

    transformed.totalPrice = {
      pln: transformed.items.reduce((prev, curr) => prev + curr.price, 0),
      usd: transformed.items.reduce((prev, curr) => prev + curr.price, 0) * usd,
      eur: transformed.items.reduce((prev, curr) => prev + curr.price, 0) * eur,
    };

    return transformed;
  },
});

zombieSchema.statics = {

  async get(id) {
    try {
      let zombie;

      if (mongoose.Types.ObjectId.isValid(id)) {
        zombie = await this.findById(id).exec();
      }
      if (zombie) {
        return zombie;
      }

      throw new APIError({
        message: 'Zombie does not exist',
        status: httpStatus.NOT_FOUND,
      });
    } catch (error) {
      throw error;
    }
  },

  list({
    page = 1, perPage = 30, name,
  }) {
    const options = omitBy({ name }, isNil);

    return this.find(options)
      .sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .exec();
  },
};

module.exports = mongoose.model('Zombie', zombieSchema);
