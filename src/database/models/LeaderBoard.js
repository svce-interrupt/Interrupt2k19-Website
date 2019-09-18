// Site model
const Sequelize =     require('sequelize');
const db        =     require('../config/connection');

const LeaderBoard  =  db.define('leaderboard', {

    score : {
        type : Sequelize.INTEGER,
        defaultValue : 1,
        allowNull : false
    },

    attempts : {
        type : Sequelize.INTEGER,
        defaultValue : 0,
    }



}, {
    freezeTableName : true,
});

module.exports = LeaderBoard;