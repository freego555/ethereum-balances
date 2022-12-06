const Web3 = require('web3');
const erc20Abi = require('../abi/erc20.json');
const coingeckoApi = require('./coingeckoApi');

const web3 = new Web3(
  new Web3.providers.HttpProvider(process.env.WEB3_HTTP_PROVIDER_URL)
);

const getOneErc20BalanceOf = async (walletAddress, contractAddress) => {
  const contract = new web3.eth.Contract(erc20Abi, contractAddress);
  const balance = await contract.methods.balanceOf(walletAddress).call();
  const convertedBalance = web3.utils.fromWei(balance);
  return convertedBalance;
};

exports.getEthBalanceOf = async (walletAddress) => {
  const balance = await web3.eth.getBalance(walletAddress);
  const convertedBalance = web3.utils.fromWei(balance);
  return convertedBalance;
};

exports.getOneErc20BalanceOf = getOneErc20BalanceOf;

exports.getAllErc20BalanceOf = async (walletAddress) => {
  let balances;

  const tokensList = await coingeckoApi.getTokensList();
  if (!tokensList) {
    throw new Error('Cannot get tokens list');
  }

  // Get balance of every token on Ethereum
  let i = 0;
  balances = [];
  for (token of tokensList) {
    if (token.platforms.ethereum) {
      balances.push({
        symbol: token.symbol,
        name: token.name,
        balance: await getOneErc20BalanceOf(
          walletAddress,
          token.platforms.ethereum
        ),
      });
      if (i++ >= 10) break; // TEST !!!
    }
  }

  return balances;
};
