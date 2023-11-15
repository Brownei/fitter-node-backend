require('dotenv').config();
const sequelize = require('sequelize')
const logger = require('./logger')

function getDatabaseVariables() {
    const host = process.env.MYSQL_HOST;
    const port = Number(process.env.MYSQL_PORT);
    const user = process.env.MYSQL_USER;
    const password = process.env.MYSQL_PASSWORD;
    const databaseName = process.env.MYSQL_DATABASE_NAME;

    if( !host || !port || !user || !password || !databaseName ) {
        throw new Error('No variables for the MYSQL database!');
    }

    return {
        host,
        port,
        user,
        password,
        databaseName,
    };
}

const Sequelize = new sequelize.Sequelize({
    host: getDatabaseVariables().host,
    dialect: 'mysql',
    database: getDatabaseVariables().databaseName,
    password: getDatabaseVariables().password,
    port: getDatabaseVariables().port,
    username: getDatabaseVariables().user,
});

module.exports = Sequelize;