import {
  authPort,
  connect,
  loginHandler,
  registerHandler,
} from '@aquirozdev/core';
import { json, urlencoded } from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.post('/login', loginHandler);
app.post('/register', registerHandler);
app
  .get('/', (req, res) => res.send('OK'))
  .get('/health', (req, res) => res.send('OK'));

const port = authPort;
const server = app.listen(port, () => {
  console.log(`Auth Service listening at http://localhost:${port}`);
  connect('auth');
});
server.on('error', console.error);
