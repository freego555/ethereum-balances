import fsPromises from 'node:fs/promises';
import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });
import axios from 'axios';
import Config from './interfaces/config';

let config: Config = {};

const fetchAndCheckConfigValues = () => {
  if (!process.env.HOST_URL) {
    config.hostUrl = 'http://localhost:3000';
    console.warn(
      `Config option HOST_URL isn't specified in config.env. Host URL will be ${config.hostUrl} by default`
    );
  } else {
    config.hostUrl = process.env.HOST_URL;
  }

  if (!process.env.WALLET_ADDRESS) {
    throw new Error(
      'Config option WALLET_ADDRESS should be specified in config.env'
    );
  } else {
    config.walletAddress = process.env.WALLET_ADDRESS;
  }

  if (!process.env.WORKING_DIR) {
    throw new Error(
      'Config option WORKING_DIR should be specified in config.env'
    );
  } else {
    config.workingDir = process.env.WORKING_DIR;
  }

  if (!process.env.JOB_INTERVAL_IN_MS) {
    throw new Error(
      'Config option JOB_INTERVAL_IN_MS should be specified in config.env'
    );
  } else {
    config.jobIntervalInMs = +process.env.JOB_INTERVAL_IN_MS;
  }
};

const fetchAndSaveBalances = async () => {
  console.log(
    new Date(),
    'Start of fetching balances of',
    config.walletAddress
  );

  try {
    const result = await axios.get(
      `${config.hostUrl}/api/v1/accounts/${config.walletAddress}`
    );
    console.log(
      `${result.config.method} ${result.status} ${result.config.url}`
    );

    if (result.status == 200 && result.data) {
      // Save balances to file
      await fsPromises.writeFile(
        `${config.workingDir}/balances.json`,
        JSON.stringify({ ...result.data.data, fetchedAt: Date.now() })
      );
    }
  } catch (err) {
    console.error(err);
  }

  console.log(new Date(), 'End of fetching balances of', config.walletAddress);

  // Start job
  setTimeout(fetchAndSaveBalances, config.jobIntervalInMs);
};

const start = () => {
  fetchAndCheckConfigValues();
  fetchAndSaveBalances();
};

start();
