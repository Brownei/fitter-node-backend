const express = require('express')
const { getAParticularRequest, getAllRequestsMade, makeARequest } = require('./controller')
const { verifyAuth } = require('../../utils/middlewares')

const router = express.Router()

// router.use(verifyAuth)

router.route('/')
    .get(getAllRequestsMade)
    .post(makeARequest);

router.get('/:id', getAParticularRequest)

module.exports = router;