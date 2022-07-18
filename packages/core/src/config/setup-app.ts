import cors = require('cors');
import { Application, json, urlencoded } from 'express';
import express = require('express');
import * as morgan from 'morgan';
import * as cookieParser from 'cookie-parser';
export const setupApp = (app: Application) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(json());
  app.use(urlencoded({ extended: true }));
  // Cookie parser
  app.use(cookieParser());
  app.use(morgan('combined'));
  app
    .get('/', (req, res) => res.send('OK'))
    .get('/health', (req, res) => res.send('OK'));
};
