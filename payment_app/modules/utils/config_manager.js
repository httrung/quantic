const Promise = require('bluebird');
const logger = require('./logger');
const version = require('./../../config/version/version');
/*
* To init everything for project
*/
const init = () => {
    return new Promise((resolve, reject) => {        
        return resolve(version);
    });
}

module.exports = init;