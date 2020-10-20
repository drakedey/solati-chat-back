const client = require('../db');
const axios = require('axios');
const { addHistoryTransaction } = require('./conversionHistory');

const getValueFromTo = async (value, username, from = 'COP', to = 'USD') => {
  try {
    const url = `https://free.currconv.com/api/v7/convert?q=${from}_${to}&compact=ultra&apiKey=${process.env.API_KEY}`;
    const result = await axios.get(url);
    const exchangeRate = result.data[`${from}_${to}`];
    const conversionData = {
      exchangeRate,
      value,
      conversion: (exchangeRate * value).toFixed(2),
    };

    const query = `SELECT * FROM chat_user WHERE username = $1`;
    const data = await client.query(query, [username]);
    const { rows } = data;
    const [userData] = rows;

    await addHistoryTransaction(conversionData.conversion, value, userData['id']);
    return conversionData;
  } catch (er) {
    console.error(er);
  }
};

module.exports = {
  getValueFromTo,
};
