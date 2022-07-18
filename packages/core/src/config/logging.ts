import { Application } from 'express';
import * as morgan from 'morgan';
export const setupLogging = (app: Application) => {
  app.use(morgan('combined'));
};
