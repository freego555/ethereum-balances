import Web3Package from 'web3';
import erc20Abi from '../abi/erc20';
import coingeckoApi from './coingeckoApi';

import Balance from '../interfaces/balance';

if (!process.env.WEB3_HTTP_PROVIDER_URL) {
  throw new Error(
    'Option WEB3_HTTP_PROVIDER_URL should be specified in config.env'
  );
}

const web3 = new Web3Package(
  new Web3Package.providers.HttpProvider(process.env.WEB3_HTTP_PROVIDER_URL)
);

class Web3 {
  static async getOneErc20BalanceOf(
    walletAddress: string,
    contractAddress: string
  ) {
    const contract = new web3.eth.Contract(erc20Abi, contractAddress);
    const balance = await contract.methods.balanceOf(walletAddress).call();
    const convertedBalance = web3.utils.fromWei(balance);
    return convertedBalance;
  }

  static async getEthBalanceOf(walletAddress: string) {
    const balance = await web3.eth.getBalance(walletAddress);
    const convertedBalance = web3.utils.fromWei(balance);
    return convertedBalance;
  }

  static async getAllErc20BalanceOf(walletAddress: string) {
    const tokensList = await coingeckoApi.getTokensList();
    if (!tokensList) {
      throw new Error('Cannot get tokens list');
    }

    // Get balance of every token on Ethereum
    let balances: Balance[] = [];
    for (let token of tokensList) {
      if (token.platforms.ethereum) {
        let balanceObject: Balance = {
          symbol: token.symbol,
          name: token.name,
        };

        try {
          balanceObject.balance = await Web3.getOneErc20BalanceOf(
            walletAddress,
            token.platforms.ethereum
          );
        } catch (e) {
          balanceObject.error = (e as Error).toString();
          console.error(e);
        }

        balances.push(balanceObject);
      }
    }

    return balances;
  }
}

export default Web3;
