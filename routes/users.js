const express = require('express');

const router = express.Router();

const { createUser, logingUser, getUserByUsername } = require('../controllers/users');

router.route('/').post(createUser).get(logingUser);

router.route('/:username').get(getUserByUsername);

module.exports = router;
