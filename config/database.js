
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('myTask', 'root', 'RootImr@n123', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;