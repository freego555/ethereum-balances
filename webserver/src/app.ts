import express from 'express';
import 'express-async-errors';
import web3 from './services/web3';

import Balance from './interfaces/balance';
import AccountBalancesResponseBody from './interfaces/account-balances-response';
import { ResponseStatus } from './interfaces/response-status';

const app = express();

app.get('/api/v1/accounts/:address', async (req, res) => {
  const walletAddress = req.params.address;
  if (!walletAddress) {
    throw new Error('Wallet address should be specified');
  }

  let balances: Balance[] = [];

  // Get ETH balance
  balances.push({
    symbol: 'ETH',
    name: 'Ethereum',
    balance: await web3.getEthBalanceOf(walletAddress),
  });

  // Get ERC-20 token balances
  const erc20Balances: Balance[] = await web3.getAllErc20BalanceOf(
    walletAddress
  );

  balances = balances.concat(erc20Balances);

  const responseBody: AccountBalancesResponseBody = {
    status: ResponseStatus.Success,
    data: {
      address: walletAddress,
      balances,
      balancesLength: balances.length,
    },
  };

  res.status(200).send(responseBody);
});

export default app;
