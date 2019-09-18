// Site model
const Sequelize =     require('sequelize');
const db        =     require('../config/connection');

const Challenge  =  db.define('challenge', {

    level : {
        type : Sequelize.INTEGER,
        defaultValue : 1,
        allowNull : false
    },

    score : {
        type : Sequelize.INTEGER,
        defaultValue : 0,
        allowNull : false
    }
    
}, {
    freezeTableName : true,
});

module.exports = Challenge;