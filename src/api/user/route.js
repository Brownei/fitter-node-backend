const express = require('express')
const {createNewUser} = require('./controller')

const router = express.Router();

router.post('/', createNewUser)

module.exports = router;