const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

const client = new Client({
  user: `${process.env.DB_USER}`,
  host: `${process.env.DB_HOST}`,
  database: `${process.env.DB_NAME}`,
  password: `${process.env.DB_PASSWORD}`,
  port: process.env.DB_PORT,
});

(async () => {
  let retries = 3;
  while (retries) {
    try {
      await client.connect();
      break;
    } catch (err) {
      if (err.code == 'ECONNREFUSED')
        retries--;
      else
        break;
      console.log(`retries left: ${retries}`);
    }
  }
  if (!retries) process.exit(0);
})();

module.exports = client;
