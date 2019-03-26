const Promise = require('bluebird');
const Sequelize = require('sequelize');
const dbConfig = require('./../../config/db/info');
const logger = require('./../utils/logger');

let instance = null;

class DBManager {
    
    constructor() {
        if (!instance) {
            logger.info('Create new DB instance!');
            this.time = new Date();     
            this.isInitDB = false;   
            this.sequelize = null;               
            instance = this;            
        } else {
            //logger.info(`Get existing'db instance! `, instance.time);
        }
        
        return instance;
    }

    init() {
        if (!this.isInitDB) {
            logger.info('Starting init db...');
            //init db
            return new Promise((resolve, reject) => {
                const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
                    host: dbConfig.host,
                    dialect: dbConfig.dialect,
                    operatorsAliases: dbConfig.operatorsAliases,              
                    pool: {
                        max: dbConfig.pool_max,
                        min: dbConfig.pool_min,
                        acquire: dbConfig.acquire,
                        idle: dbConfig.idle
                    },
                    define : {
                        timestamps : false,
                        freezeTableName : true
                    },
                    logging : false
                });
                return sequelize.authenticate()
                    .then(() => {
                        logger.info('Connection has been established successfully.');
                        this.sequelize = sequelize;
                        this.isInitDB = true;
                        return resolve('Started DB! ' + this.time);
                    })
                    .catch(err => {
                        logger.error('Unable to connect to the database:', err.message);
                        return reject('Start DB Error! ' + this.time)
                    });
            });
        }
    }

    checkInitDB () {
        return this.isInitDB;
    }

    getSequelize() {
        return this.sequelize;
    }
}

module.exports = DBManager;