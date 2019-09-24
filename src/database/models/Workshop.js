// Site model
const Sequelize =     require('sequelize');
const db        =     require('../config/connection');

const Workshop  =  db.define('workshop', {

     workshop : {
          type : Sequelize.BOOLEAN,    
          defaultValue : false
      }

}, {
    freezeTableName : true,
});

module.exports = Workshop;