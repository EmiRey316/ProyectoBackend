const winston = require("winston");
const { combine, timestamp, prettyPrint, simple, colorize } = winston.format;

const logger = winston.createLogger({
    format: combine(
        timestamp(),
        prettyPrint(),
        colorize(),
      ),
    
    transports: [
        new winston.transports.Console({
            level: "info",
            format: simple()
        }),

        new winston.transports.File({
            level: "error",
            filename: "src/Logs/error.log"
        })
    ]
})


const warnLogger = winston.createLogger({
    format: combine(
        timestamp(),
        simple(),
        colorize()
      ),

    transports: [
        new winston.transports.Console({
            level: "warn"
        }),

        new winston.transports.File({
            level: "warn",
            filename: "src/Logs/warn.log"
        }),
    ]
})


module.exports = {
    logger,
    warnLogger
};