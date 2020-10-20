const jwt = require('jsonwebtoken');

const generateToken = (userData) => {
  const token = jwt.sign(userData, process.env.TOKEN_HASH, {
    expiresIn: `${process.env.TOKEN_EXPIRATION_SECONDS}s`,
  });

  return { token, expiresIn: process.env.TOKEN_EXPIRATION_SECONDS };
}

module.exports = generateToken;
