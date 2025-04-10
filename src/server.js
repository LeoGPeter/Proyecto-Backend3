import express from 'express';
import { connectDB } from './config/mongo.js';
import mocksRouter from './routes/mocks.router.js';
import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import sessionsRouter from './routes/sessions.router.js';
import adoptionsRouter from './routes/adoptions.router.js';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/errorHandler.js';
import { logger } from './utils/logger.js';
import { swaggerUiServe, swaggerUiSetup } from './docs/swaggerConfig.js';

const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();

app.use(express.json());
app.use('/api/mocks', mocksRouter);
app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/adoptions', adoptionsRouter);

app.use('/api/docs', swaggerUiServe, swaggerUiSetup);

app.use(errorHandler);

connectDB().then(() => {
    app.listen(PORT, () => {
        logger.info(`Server running on port ${PORT}`);
    });
});