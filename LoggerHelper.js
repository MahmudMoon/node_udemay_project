const winston = require('winston');
require('dotenv').config();
const config = require('./config');
const chalk = require('chalk');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.simple(),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'logfile.log' })
    ]
  });

module.exports = {
    info: (message)=>{
        if(config.getConfiguration().name == "development"){
            logger.info(chalk.green(message));
        }
    },

    warn: (message) =>{
        if(config.getConfiguration().name == "development"){
            logger.warn(chalk.yellow(message));
        }
    },

    error: (message, err)=>{
        if(config.getConfiguration().name == "development"){
            logger.error(chalk.red(message))
        }
    }
}  