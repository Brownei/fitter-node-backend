require('dotenv').config()
const express = require('express')

const { loginUser, logoutUser } = require('./controller')
const User = require('../user/model')


const router = express.Router();

router.post('/login', loginUser)
router.post('/logout', logoutUser)


module.exports = router