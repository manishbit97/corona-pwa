const winston = require('winston')
require('winston-daily-rotate-file');

const { createLogger, format, transports } = winston

var path = require('path');

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.colorize(),
    format.timestamp({
      format: 'DD-MM-YYYY HH:mm:ss'
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: 'prandpress' },
  transports: [
    //
    // - Write to all logs with level `info` and below to `quick-start-combined.log`.
    // - Write all logs error (and below) to `quick-start-error.log`.
    //
    new transports.File({ filename: '/var/log/node-prandpress/app-error.log', level: 'error' }),
    new transports.File({ filename: '/var/log/node-prandpress/app-combined.log' }),
    new transports.DailyRotateFile({
      filename: '/var/log/node-prandpress/app-combined-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: '1m',

    }),
  ]
});


//
// If we're not in production then **ALSO** log to the `console`
// with the colorized simple format.
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: format.combine(
      format.colorize(),
      format.simple()
    )
  }));
}

logger.info("APP started/restarted")
logger.error("This is just a sample error check ")
// ***************
// Allows for JSON logging
// ***************

// logger.info({
//   message: 'Use a helper method if you want',
//   additional: 'properties',
//   are: 'passed along'
// });

// // ***************
// // Allows for parameter-based logging
// // ***************

// logger.log('info', 'Pass a message and this works', {
//   additional: 'properties',
//   are: 'passed along'
// });

// logger.info('Use a helper method if you want', {
//   additional: 'properties',
//   are: 'passed along'
// });

// // ***************
// // Allows for string interpolation
// // ***************

// // info: test message my string {}
// logger.log('info', 'test message %s', 'my string');

// // info: test message my 123 {}
// logger.log('info', 'test message %d', 123);

// info: test message first second {number: 123}
// logger.log('info', 'test message %s, %s', 'first', 'second', { number: 123 });

// // prints "Found error at %s"
// logger.info('Found %s at %s', 'error', new Date());
// logger.info('Found %s at %s', 'error', new Error('chill winston'));
// logger.info('Found %s at %s', 'error', /WUT/);
// logger.info('Found %s at %s', 'error', true);
// logger.info('Found %s at %s', 'error', 100.00);
// logger.info('Found %s at %s', 'error', ['1, 2, 3']);

// // ***************
// // Allows for logging Error instances
// // ***************

// logger.warn(new Error('Error passed as info'));
// logger.log('error', new Error('Error passed as message'));

// logger.warn('Maybe important error: ', new Error('Error passed as meta'));
// logger.log('error', 'Important error: ', new Error('Error passed as meta'));

// logger.error(new Error('Error as info'));

module.exports = logger