import express, { json, urlencoded } from 'express';
import healthCheckRouter from './routes/health-check.route';
import cors from 'cors';
import authRouter from './routes/auth.route';
import { errorHandler } from './shared/middlewares/error-handler';

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));

app.use("/healthcheck", healthCheckRouter);
app.use("/auth", authRouter);

app.use(errorHandler);

export { app };
