import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });

import app from './app';

if (!process.env.SERVER_PORT || !process.env.SERVER_HOST) {
  throw new Error(
    'Options SERVER_PORT and SERVER_HOST should be specified in config.env'
  );
}
const serverPort: number = +process.env.SERVER_PORT;
const serverHost: string = process.env.SERVER_HOST;

app.listen(serverPort, serverHost, () => {
  console.log(`Listening on ${serverHost}:${serverPort}...`);
});
