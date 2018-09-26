const NodeCache = require('node-cache');
const { getItemsMarketData } = require('./items');
const { getCurrenciesExchangeRates } = require('./currency');

const myCache = new NodeCache();

exports.setItems = async () => {
  try {
    const market = await getItemsMarketData();
    myCache.set('market', market);
    console.log('Market data loaded');
  } catch (e) {
    console.log('Couldnt find cache data');
  }
};

exports.setExchangeRates = async () => {
  try {
    const data = await getCurrenciesExchangeRates();
    myCache.set('exchangeRates', data);
    console.log('Exchange rates loaded');
  } catch (e) {
    console.log('Couldnt find cache data');
  }
};

exports.getMarketData = () => myCache.get('market');

exports.getExchangeRates = () => myCache.get('exchangeRates');
