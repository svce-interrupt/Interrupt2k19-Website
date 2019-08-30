const Sequelize   =   require('sequelize');
const path        =   require('path');
const dotenv      =   require('dotenv').config({ path : path.resolve(__dirname + '/../../../.env')});

module.exports    =   new Sequelize(process.env.DB_BASE, process.env.DB_USER, process.env.DB_PASS, {
    host    : process.env.DB_HOST,
    dialect : process.env.DB_NAME,
    logging : false,

    pool : {
        max : 5,
        min : 0,
        acquire : 30000,
        idle : 10000
    }
});