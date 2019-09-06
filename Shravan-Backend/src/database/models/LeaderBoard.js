// Site model
const Sequelize =     require('sequelize');
const db        =     require('../config/connection');

const LeaderBoard  =  db.define('leaderboard', {

    level : {
        type : Sequelize.INTEGER,
        defaultValue : 1,
        allowNull : false
    }

}, {
    freezeTableName : true,
});

module.exports = LeaderBoard;