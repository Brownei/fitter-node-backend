const express = require('express');
const users = require('./user/route')
const login = require('./login/route')
const requestAssistance = require('./request/route');

const router = express.Router();

router.use('/user', users);
router.use('/auth', login);
router.use('/request-assistance', requestAssistance)

module.exports = router;
