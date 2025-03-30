import mongoose from 'mongoose';
import { logger } from '../utils/logger.js';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/adoptme';

export const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        logger.info('Connected to MongoDB');
    } catch (error) {
        logger.error('MongoDB connection error:', error);
        process.exit(1);
    }
};