import express, { json, urlencoded } from 'express';
import healthCheckRouter from './routes/health-check.route';
import cors from 'cors';
import authRouter from './routes/auth.route';
import { errorHandler } from './shared/middlewares/error-handler';
import postRouter from './routes/post.route';

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.use("/healthcheck", healthCheckRouter);
app.use("/auth", authRouter);
app.use("/posts", postRouter);

app.use(errorHandler);

export { app };
