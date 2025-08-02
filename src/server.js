import dotenv from 'dotenv';
import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { getEnvVar } from './utils/getEnvVar.js';
import { ENV_VARS } from './constants/envVars.js';

export const startServer = () => {
  dotenv.config();
  const app = express();

  const PORT = getEnvVar(ENV_VARS.PORT);

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
    cors(),
  );

  app.get('/', (req, res) => {
    res.json({
      message: 'Hello, World!',
    });
  });

  app.use((req, res) => {
    res.status(404).json({
      status: 404,
      message: 'Route not found',
    });
  });

  app.use((err, req, res, next) => {
    res.status(500).json({
      status: 500,
      message: 'Something went wrong',
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
