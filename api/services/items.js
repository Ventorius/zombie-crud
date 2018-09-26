const axios = require('axios');

exports.getItemsMarketData = async () => new Promise(async (resolve, reject) => {
  try {
    const { data } = await axios.get('https://zombie-items-api.herokuapp.com/api/items');
    resolve(data);
  } catch (e) {
    reject(e);
  }
});
