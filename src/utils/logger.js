import winston from 'winston';

const levels = {
    debug: 0,
    http: 1,
    info: 2,
    warn: 3,
    error: 4,
    fatal: 5
};

const logger = winston.createLogger({
    levels,
    format: winston.format.combine(
        winston.format.timestamp({
            format: () => new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' })
        }),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console({
            level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
            format: winston.format.simple()
        }),
        new winston.transports.File({ filename: 'errors.log', level: 'error' })
    ]
});

export { logger };