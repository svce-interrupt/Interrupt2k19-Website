// Site model
const Sequelize =     require('sequelize');
const bcrypt    =     require('bcryptjs');
const db        =     require('../config/connection');

const Student  =  db.define('students', {

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
        type : Sequelize.STRING,
        unique : true,
        allowNull : false,
        validate: {
            isEmail: true
        }
    },

    ph_number : {
        type : Sequelize.STRING,
        unique : true
    },

    password : {
        type : Sequelize.STRING,
        allowNull : false
    },

    isAdmin : {
        type : Sequelize.BOOLEAN,
        defaultValue : false
    },

    hasVoted : {
        type : Sequelize.BOOLEAN,
        defaultValue : false,
    }

}, {
    hooks : {
        beforeCreate : (student) => {
            const salt = bcrypt.genSaltSync(8);
            student.password = bcrypt.hashSync(student.password, salt);
        }
    },
});

//Instance methods
Student.prototype.validatePassword = (password, passwordGiven) => {
    return bcrypt.compareSync(password, passwordGiven);
}

module.exports = Student;