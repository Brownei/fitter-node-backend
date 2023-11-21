const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../utils/database');
const User = require('../user/model');

class Request extends Model {}

Request.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    expiresIn: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,

    }
}, {
    sequelize,
    modelName: 'requests'
})

module.exports = Request