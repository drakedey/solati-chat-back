const axios = require('axios');

const { addHistoryTransaction } = require('./conversionHistory')

const getValueFromTo = async (value, from = 'COP', to = 'USD') => {
  try {
    const url = `https://free.currconv.com/api/v7/convert?q=${from}_${to}&compact=ultra&apiKey=${process.env.API_KEY}`;
    const result = await axios.get(url);
    const exchangeRate = result.data[`${from}_${to}`];
    const conversionData = { exchangeRate, value, conversion: (exchangeRate * value).toFixed(2) }
    await addHistoryTransaction(conversionData.conversion, value);
    return conversionData ;
  } catch (er) {
    console.error(er);
  }
};

module.exports = {
  getValueFromTo,
};
