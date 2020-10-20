const bcrypt = require('bcrypt');

const client = require('../db');
const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const tokenGenerator = require('../utils/tokenGenerator');

// @desc Create user on DB
// @route POST /api/v1/users/
// @access Public
const createUser = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;
  console.log(password);

  if (!username || !password) {
    return next(new ErrorResponse('Invalid params', 400));
  }

  const salt = process.env.PASSWORD_SALT;

  const passwordHash = await bcrypt.hash(password, parseInt(salt));

  const query = `INSERT INTO chat_user (username, user_password) VALUES ($1, $2)`;
  await client.query(query, [username, passwordHash]);

  res.status(200).send(tokenGenerator({ username }));
});

// @desc Get user by credentials and validate password
// @route GET /api/v1/users/
// @access Public
const logingUser = asyncHandler(async (req, res, next) => {
  const { username, password } = req.headers;
  const query = `SELECT * FROM chat_user WHERE username = $1`;
  const data = await client.query(query, [username]);
  const { rowCount, rows } = data;

  if (rowCount === 0) {
    return next(new ErrorResponse('Invalid user credentials', 401));
  }

  const [userData] = rows;

  const match = await bcrypt.compare(password, userData['user_password']);

  if (!match) {
    return next(new ErrorResponse('Invalid user credentials', 401));
  }

  res.status(200).send(tokenGenerator({ username: userData['username:'] }));
});

// @desc Verify if user with the username exists
// @route GET /api/v1/users/:username
// @access Public
const getUserByUsername = asyncHandler(async (req, res, next) => {
  const { username } = req.params;
  if (!username) {
    return next(new ErrorResponse('Please provide an username', 400));
  }
  const query = `SELECT * FROM chat_user WHERE username = $1`;
  const data = await client.query(query, [username]);
  const { rowCount } = data;

  if (rowCount === 0) {
    return next(new ErrorResponse("User doesn't exists", 404));
  }

  res.status(200).send({ success: true, data: {} });
});

module.exports = {
  createUser,
  logingUser,
  getUserByUsername
};
