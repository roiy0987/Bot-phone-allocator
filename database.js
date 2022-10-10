const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('smile_db','postgres','smileproject',{
    host: 'localhost',
    dialect: 'postgres'
});

module.exports = sequelize;