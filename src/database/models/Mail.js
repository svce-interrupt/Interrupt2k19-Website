// Site model
const Sequelize =     require('sequelize');
const db        =     require('../config/connection');

const Mail  =  db.define('mail', {

    student_name : {
        type : Sequelize.STRING
    },

    email : {
        type : Sequelize.STRING,
        unique : true,
        allowNull : false,
        validate: {
            isEmail: true
        }
    },

    hasVoted : {
        type : Sequelize.BOOLEAN,
        defaultValue : false,
    },

    participated : {
        type : Sequelize.BOOLEAN,
        defaultValue : false
    }

},{
    freezeTableName :  true
});

module.exports = Mail;