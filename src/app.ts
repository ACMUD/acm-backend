import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

import apiRouter from './routes';
import error404 from './middlewares/error404';
import errorHandler from './middlewares/errorHandler';

export function createApp() {
  // Create App
  const app = express();

  // Middlewares
  app.disable('x-powered-by');
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(cors());

  // Logger in dev mode
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }

  // API
  app.use('/', apiRouter);

  // Error Handlers
  app.use(error404);
  app.use(errorHandler);

  // Return new App
  return app;
}
