import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });

import app from './app';

const serverPort: number = process.env.SERVER_PORT
  ? +process.env.SERVER_PORT
  : 3000;
const serverHost: string = process.env.SERVER_HOST
  ? process.env.SERVER_HOST
  : 'localhost';

app.listen(serverPort, serverHost, () => {
  console.log(`Listening on ${serverHost}:${serverPort}...`);
});
