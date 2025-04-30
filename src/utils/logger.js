import winston from 'winston';
import moment from 'moment-timezone';

// Detecta automáticamente la zona horaria del sistema
const localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

const logFormat = winston.format.printf(({ level, message, timestamp }) => {
    const localTime = moment(timestamp).tz(localTimeZone).format('YYYY-MM-DD HH:mm:ss');
    return `[${localTime}] [${level.toUpperCase()}]: ${message}`;
});

const logger = winston.createLogger({
    level: 'debug',
    format: winston.format.combine(
        winston.format.timestamp(),
        logFormat
    ),
    transports: [
        new winston.transports.Console({ level: 'debug' }),
        new winston.transports.File({ filename: 'logs/errors.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' })
    ]
});

export { logger };
