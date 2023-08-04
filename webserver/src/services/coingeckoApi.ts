import axios from 'axios';

const apiBaseUrl: string = process.env.COINGECKO_API_URL
  ? process.env.COINGECKO_API_URL
  : 'https://api.coingecko.com/api/v3';

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
