const Sequelize = require('sequelize');

const sequelize = require('../database');

const patient_phones=sequelize.define('patient_phone',{
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    patient_phone:{
        type: Sequelize.STRING,
        allowNull:false
    },
    clinic_name:{
        type: Sequelize.STRING,
        allowNull:false
    },
    smile_phone:{
        type: Sequelize.STRING,
        allowNull:false
    }
});

module.exports = patient_phones;