let winston = require('winston');
let Moment = require('moment');
let logLevel = 'verbose';
let emitErrs = true;
let transports = [];
let moment = new Moment();

// Log levels are { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
transports.push(new (winston.transports.Console)({
    level: logLevel,
    timestamp: function () {
        return moment.format('HH:mm:ss.SSS');
    },
    colorize: true
}));

// Remove default logger
winston.remove(winston.transports.Console);

let logger = new winston.Logger({
    verbose: logLevel,
    emitErrs: emitErrs,
    transports: transports
});

module.exports = logger;