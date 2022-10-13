const Sequelize = require('sequelize');

const sequelize = require('../database');

const smile_phones=sequelize.define('smile_phone',{
    phone: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    }
});

module.exports = smile_phones;