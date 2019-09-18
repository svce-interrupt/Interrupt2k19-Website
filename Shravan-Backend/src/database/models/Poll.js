// Site model
const Sequelize =     require('sequelize');
const db        =     require('../config/connection');

const Poll  =  db.define('poll', {

    votes : {
        type : Sequelize.INTEGER,
        defaultValue : 0,
        allowNull : false
    },

});

module.exports = Poll;