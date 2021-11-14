// const request = require('request-promise');
const axios = require('axios');

const getApiRequest = async (uri) => {
  const response = await axios.get(`${uri}`).catch((err) => err);
  return response;
};

module.exports = { getApiRequest };
