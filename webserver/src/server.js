const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');

const serverPort = process.env.SERVER_PORT;
const serverHost = process.env.SERVER_HOST;

app.listen(serverPort, serverHost, () => {
  console.log(`Listening on ${serverHost}:${serverPort}...`);
});
