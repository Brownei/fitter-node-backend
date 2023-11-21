const jwt = require('jsonwebtoken')
const logger = require('../../utils/logger')
const Request = require('./model');

async function getAllRequestsMade(req, res, next) {
    const token = req.cookies.jwt

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        console.log(decoded)

        if(!decoded || decoded.role === 'Client') {
            return res.status(401).json("Unauthorized")
        }

        const allRequests = await Request.findAll()
        return res.status(200).json({ allRequests })
    } catch (error) {
        logger.error(error)
        console.log(error)
        next(error)
        return res.status(422).json(error)
    }
}

async function makeARequest() {

}

async function getAParticularRequest() {

}

module.exports = {
    getAllRequestsMade,
    makeARequest,
    getAParticularRequest
}