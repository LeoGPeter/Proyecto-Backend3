import express from 'express';
import { connectDB } from './config/mongo.js';
import mocksRouter from './routes/mocks.router.js';
import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import { errorHandler } from './middleware/errorHandler.js';
import { logger } from './utils/logger.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/mocks', mocksRouter);
app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);

app.use(errorHandler);

connectDB().then(() => {
    app.listen(PORT, () => {
        logger.info(`Server running on port ${PORT}`);
    });
});