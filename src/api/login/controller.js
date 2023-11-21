require('dotenv').config();
const { compare } = require('bcrypt')
const jwt = require('jsonwebtoken')
const logger = require('../../utils/logger')

const User = require('../user/model');


async function loginUser(req, res, next) {
    const {userName, password} = req.body

    try {
        const user = await User.findOne({
            where: {
                userName: Number(userName)
            }
        })

        if(!user) {
            return res.status(401).json({message : "No user like this available!"})
        }

        const passwordMatch = await compare(password, user.dataValues.password)

        if(!passwordMatch) {
            return res.status(401).json({ message: "Wrong password, Please try again!" })
        }

        // const accessToken = jwt.sign(
        //     {
        //         "userInfo": {
        //             "username": user.dataValues.userName,
        //             "roles": user.dataValues.role
        //         }
        //     },
        //     process.env.JWT_SECRET,
        //     { expiresIn: '15m' }
        // )
    
        const refreshToken = jwt.sign(
            { 
                "id": user.dataValues.id,
                "email": user.dataValues.email,
                "username": user.dataValues.userName,
                "role": user.dataValues.role
            },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        )

        res.cookie('jwt', refreshToken, {
            httpOnly: true, //accessible only by web server 
            secure: true, //https
            sameSite: 'None', //cross-site cookie 
            maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry: set to match rT
        })
    
        // Send accessToken containing username and roles 
        res.json({ refreshToken })

    } catch (error) {
        logger.error(error)
        console.log(error)
        next(error)
        return res.status(422).json(error)
    }
}


async function logoutUser(req, res, next) {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204) //No content
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
    res.json({ message: 'Cookie cleared' })
}


module.exports = {
    loginUser,
    logoutUser
}