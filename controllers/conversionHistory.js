const client = require('../db/index');

const addHistoryTransaction = (dolarValue, colombianPesosValue) => {
  const query = `INSERT INTO conversion_history (dolar_value, colombian_pesos_value) VALUES (${dolarValue}, ${colombianPesosValue})`;
  return new Promise((resolve, reject) => {
    client.query(query, (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(res);
    });
  });
};

module.exports = {
  addHistoryTransaction,
};
