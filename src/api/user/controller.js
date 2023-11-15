const User = require('./model')
const {hashSync} = require('bcrypt')
const logger = require('../../utils/logger')

async function createNewUser(req, res, next) {
    const {email, userName, password} = req.body

    try {
        const existingUser = await User.findOne({
            where: {
                email
            }
        })

        if(existingUser) {
            return res.status(409).json('User already exists!')
        }

        const hashedPassword = hashSync(password, 10)

        const newUser = await User.create({
            email,
            userName: Number(userName),
            password: hashedPassword
        })

        return res.status(201).json(newUser.dataValues);
    } catch (error) {
        logger.error(error)
        console.log(error)
        next(error)
        return res.status(422).json(error)
    }
}


module.exports = {createNewUser};