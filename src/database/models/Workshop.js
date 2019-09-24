// Site model
const Sequelize =     require('sequelize');
const db        =     require('../config/connection');

const Workshop  =  db.define('workshop', {

     workshop : {
          type : Sequelize.BOOLEAN,    
          defaultValue : false
    },

    name : {
        type : Sequelize.STRING,
    },

    email : {
        type : Sequelize.STRING,
        allowNull : false
    }

}, {
    freezeTableName : true,
});

module.exports = Workshop;