// Site model
const Sequelize =     require('sequelize');
const db        =     require('../config/connection');

const Student  =  db.define('student', {

    student_name : {
        type : Sequelize.STRING
    },

    year : {
        type : Sequelize.INTEGER
    },

    college : {
        type : Sequelize.STRING
    },

    email : {
        type : Sequelize.STRING
    },

    ph_number : {
        type : Sequelize.STRING
    },

});

module.exports = Student;