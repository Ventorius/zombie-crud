const axios = require('axios');

exports.getCurrenciesExchangeRates = async () => new Promise(async (resolve, reject) => {
  try {
    const { data } = await axios.get('http://api.nbp.pl/api/exchangerates/tables/C/today?format=json');

    const { rates } = data[0];

    const findCurrency = (arr, code) => arr.find(item => item.code === code);

    const res = {
      effectiveDate: '2018-09-26',
      eur: findCurrency(rates, 'EUR').ask,
      usd: findCurrency(rates, 'USD').ask,
    };

    resolve(res);
  } catch
  (e) {
    reject(e);
  }
});
