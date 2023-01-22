import axios from 'axios';

if (!process.env.COINGECKO_API_URL) {
  throw new Error('Option COINGECKO_API_URL should be specified in config.env');
}
const apiBaseUrl: string = process.env.COINGECKO_API_URL;

class coingeckoApi {
  static async getTokensList() {
    let data;
    try {
      const result = await axios.get(`${apiBaseUrl}/coins/list`, {
        params: { include_platform: true },
      });

      data = result.data;
    } catch (err) {
      console.error(err);
      data = undefined;
    }

    return data;
  }
}

export default coingeckoApi;
