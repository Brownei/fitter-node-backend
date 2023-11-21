const User = require('./model')
const {hashSync} = require('bcrypt')
const logger = require('../../utils/logger')
const { Op } = require("sequelize");

async function getAParticularUser(req, res, next) {
    const {id} = req.params

    try {
        const existingUser = await User.findByPk(id)

        if(!existingUser) {
            return res.status(409).json('No such user!')
        }

        return res.status(200).json(existingUser)
    } catch (error) {
        logger.error(error)
        console.log(error)
        next(error)
        return res.status(422).json(error)
    }
}

async function createNewUser(req, res, next) {
    const {email, userName, password} = req.body

    try {
        const existingUser = await User.findOne({
            where: {
                [Op.or]: [
                    {email},
                    {userName: Number(userName)}
                ]
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


async function updateUserProfile(req, res, next) {
    const {id} = req.params
    const {email, userName, password} = req.body

    
    try {
        const existingUser = await User.findByPk(id)

        if(!existingUser) {
            return res.status(404).json("No such user")
        }

        const existingUserNameOrEmail = await User.findOne({
            where: {
                [Op.and]: [
                    {[Op.or] : [
                        {userName: Number(userName)},
                        {email}
                    ]},
                    {id: {
                        [Op.ne]: id
                    }}
                ]
            },
            
        })

        if(existingUserNameOrEmail) {
            return res.status(404).json("Username or email already taken!")
        } 

        const hashedPassword = hashSync(password, 10)

        await User.update({
            email,
            userName: Number(userName),
            password: hashedPassword
        }, {
            where: {
                id
            }
        })


        return res.status(201).json("User updated!")
    } catch (error) {
        logger.error(error)
        console.log(error)
        next(error)
        return res.status(422).json(error)
    }
}

async function deleteUser(req, res, next) {
    const {id} = req.params
    try {
        const existingUser = await User.findByPk(id)

        if(!existingUser) {
            return res.status(404).json("No such user")
        }

        await User.destroy({
            where: {
                id
            }
        })

        return res.status(200).json("User deleted!")
    } catch (error) {
        logger.error(error)
        console.log(error)
        next(error)
        return res.status(422).json(error)
    }
}


module.exports = {
    createNewUser,
    updateUserProfile,
    deleteUser,
    getAParticularUser
};