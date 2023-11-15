const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../utils/database')

class User extends Model {}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    userName: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg: "Enter your phone number please",
            },
            notNull: {
                msg: "Enter your phone number please",
            },
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Enter your password please",
            },
            notNull: {
                msg: "Enter your password please",
            },
        },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Enter your email please",
            },
            notNull: {
                msg: "Enter your email please",
            },
        },
        unique: true
    },
    role: {
        type: DataTypes.ENUM('Client', 'Mechanic'),
        defaultValue: 'Client',
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'users'
})

module.exports = User;