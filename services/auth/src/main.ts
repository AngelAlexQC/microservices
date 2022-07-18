import * as express from 'express';
import { loginHandler, registerHandler } from '@aquirozdev/core';
import bodyParser = require('body-parser');
import * as cors from 'cors';
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.post('/login', loginHandler);
app.post('/register', registerHandler);

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Auth Service listening at http://localhost:${port}`);
});
server.on('error', console.error);
