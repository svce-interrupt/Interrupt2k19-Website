const Sequelize   =   require('sequelize');
const path        =   require('path');

const env         =   process.env.NODE_ENV || "development";
const config      =   require('./config.json')[env]; 

module.exports    =   new Sequelize(config.database, config.username, config.password, {
    host    : config.host,
    dialect : config.dialect,
    logging : false,

    pool : {
        max : 5,
        min : 0,
        acquire : 30000,
        idle : 10000
    }
});