const Sequelize = require('sequelize');
const logger = require('./logger');
const user = 'root';
const password = process.env.MYSQL_ROOT_PASSWORD;

module.exports = new Sequelize('digitalmatatus', user, password, {
    host: '127.0.0.1',
    dialect: 'mariadb'
});;
