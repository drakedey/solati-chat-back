const client = require('../db/index');

const addHistoryTransaction = async (dolarValue, colombianPesosValue, userId) => {
  const query = `INSERT INTO conversion_history (dolar_value, colombian_pesos_value, user_id) VALUES ($1, $2, $3)`;
  const result = await client.query(query, [dolarValue, colombianPesosValue, userId])
  return result;
};

module.exports = {
  addHistoryTransaction,
};
