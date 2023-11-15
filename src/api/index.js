const express = require('express');
const users = require('./user/route')
const login = require('./login/route')

const router = express.Router();

router.use('/user', users);
router.use('/auth', login)

module.exports = router;
