import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

import apiRouter from './apiRouter';

export function createServer() {
  // Create App
  const app = express();

  // Middlewares
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(cors());

  // Logger in dev mode
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }

  // API
  app.use('/', apiRouter);

  // Return new Server
  return app;
}
