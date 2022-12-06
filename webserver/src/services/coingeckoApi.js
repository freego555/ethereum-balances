const axios = require('axios');

const apiBaseUrl = process.env.COINGECKO_API_URL;

exports.getTokensList = async () => {
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
};
