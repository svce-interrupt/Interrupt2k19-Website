// Site model
const Sequelize =     require('sequelize');
const db        =     require('../config/connection');

const EventList  =  db.define('events_list', {

    ev1  : Sequelize.BOOLEAN,
    ev2  : Sequelize.BOOLEAN,
    ev3  : Sequelize.BOOLEAN,
    ev4  : Sequelize.BOOLEAN,
    ev5  : Sequelize.BOOLEAN,
    ev6  : Sequelize.BOOLEAN,
    ev7  : Sequelize.BOOLEAN,
    ev8  : Sequelize.BOOLEAN,
    ev9  : Sequelize.BOOLEAN,
    ev10  : Sequelize.BOOLEAN,    

}, {
    freezeTableName : true,
});

module.exports = EventList;