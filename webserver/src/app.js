const express = require('express');
require('express-async-errors');
const web3 = require('./services/web3');

const app = express();

app.get('/api/v1/accounts/:address', async (req, res) => {
  const walletAddress = req.params.address;
  if (!walletAddress) {
    throw new Error('Wallet address should be specified');
  }

  let balances = [];

  // Get ETH balance
  balances.push({
    symbol: 'ETH',
    name: 'Ethereum',
    balance: await web3.getEthBalanceOf(walletAddress),
  });

  // Get ERC-20 token balances
  const erc20Balances = await web3.getAllErc20BalanceOf(walletAddress);

  balances = balances.concat(erc20Balances);

  res.status(200).send({
    status: 'success',
    data: {
      address: walletAddress,
      balances,
      balancesLength: balances.length,
    },
  });
});

module.exports = app;
