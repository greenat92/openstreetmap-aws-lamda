const osmgeojson = require('../../../shared/lib/osmgeojson');
const getApiRequest = require('../../../shared/lib/axios');

const constant = require('../../../shared/constant');

module.exports.detail = async (event) => {
  const { bbox } = event.queryStringParameters;
  if (!bbox) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'bbox query param is required' }),
    };
  }
  const uri = constant.STREET_MAP_API;
  const getLocationDetailUri = `${uri}?bbox=${bbox}`;
  try {
    const res = await getApiRequest.getApiRequest(getLocationDetailUri);
    if (res.status === 200) {
      const locationOsmDetail = res.data;
      const convertedData = osmgeojson.osmToGeoJsonHelper(locationOsmDetail);
      return {
        statusCode: res.status,
        body: JSON.stringify({ data: convertedData }),
      };
    }
    return {
      statusCode: res.response.status,
      body: JSON.stringify({ error: res.response.data }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'server error' }),
    };
  }
};
