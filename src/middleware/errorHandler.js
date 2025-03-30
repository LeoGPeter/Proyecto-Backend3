import { ERROR_DICTIONARY } from '../errors/errorDictionary.js';
import { logger } from '../utils/logger.js';

export const errorHandler = (err, req, res, next) => {
    logger.error(err.message);
    const errorResponse = ERROR_DICTIONARY[err.message] || ERROR_DICTIONARY.SERVER_ERROR;
    res.status(400).json({ success: false, error: errorResponse });
};