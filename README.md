# Common

Repository consist of 2 projects:

1. `./webserver` - simple webserver with one route `/api/v1/accounts/:address` for getting all the non-zero balances of ethereum and erc20 tokens for specified address.

2. `./job` - job for fetching balances from route `/api/v1/accounts/:address`. Fetching runs with specified interval and saves results as JSON entity. that specified by `JOB_INTERVAL_IN_MS` in `./job/config.env`.

# Webserver

`npm start` to run. This version is slow. One attempt to get balances can last about 30 minutes.

You can specify following config values in `./webserver/config.env`. Some of these values are required.

- `WEB3_HTTP_PROVIDER_URL` (**required**). URL of HTTP provider of Ethereum node. For example, `https://mainnet.infura.io/v3/<api-key>`.
- `COINGECKO_API_URL`. URL of Coingecko API. Default value is `http://api.coingecko.com/api/v3`.
- `SERVER_HOST`. Server host name. Default value is `localhost`.
- `SERVER_PORT`. Server port. Default value is `3000`.

# Job

`npm start` to run. Required to run `webserver` first for appropriate working.

You can specify following config values in `./job/config.env`. Some of these values are required.

- `WORKING_DIR` (**required**). Absolute path to directory with file `balances.json` where JSON entity with balances will be saved. For example, `/home/<username>/job-test`.
- `HOST_URL`. Host to make request to. Default value is `http://localhost:3000`.
- `WALLET_ADDRESS`. Ethereum address that will be set to route `/api/v1/accounts/:address` as `address` parameter. Default value is `0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045` (Vitalik Buterin address).
- `JOB_INTERVAL_IN_MS`. Job will be run another time after previous job is completed and specified interval in milliseconds. Default value of `60000` will be 1 minute.
