// Site model
const Sequelize =     require('sequelize');
const db        =     require('../config/connection');

const EventList  =  db.define('events_list', {

    ev1  : Sequelize.BOOLEAN,
    ev2  : Sequelize.BOOLEAN,
    ev3  : Sequelize.BOOLEAN,
}, {
    freezeTableName : true,

});

module.exports = EventList;