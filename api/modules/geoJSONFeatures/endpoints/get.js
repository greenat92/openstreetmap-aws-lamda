const { osmToGeoJsonHelper } = require('../../../shared/lib/osmgeojson');
const { getApiRequest } = require('../../../shared/lib/axios');

const {
  HTTP_STATUSES,
  OPEN_STREET_MAP_API_URI,
} = require('../../../shared/constant');

/**
 * [detail to get "GeoJSON features" of a location given with the coordinates (as geolocation box). ]
 * @param  {queryStringParameters: { bbox: 13.38798,52.52326,13.38954,52.52389}} event [description]
 */

module.exports.detail = async (event) => {
  if (event.queryStringParameters === null) {
    return {
      statusCode: HTTP_STATUSES.BAD_REQUEST,
      body: JSON.stringify({ error: 'bbox query param is required' }),
    };
  }
  const uri = OPEN_STREET_MAP_API_URI;

  // gather information in "osm" format from openstreetmap api 0.6
  const getGeoJSONFeaturesDetailInOsmUri = `${uri}?bbox=${event.queryStringParameters.bbox}`;
  try {
    const res = await getApiRequest(getGeoJSONFeaturesDetailInOsmUri);
    if (res.status === HTTP_STATUSES.SUCCESS) {
      const getGeoJSONFeaturesDetailInOsm = res.data;
      const convertedGeoJSONFeaturesData = osmToGeoJsonHelper(
        getGeoJSONFeaturesDetailInOsm,
      );
      return {
        statusCode: res.status,
        body: JSON.stringify({ data: convertedGeoJSONFeaturesData }),
      };
    }
    return {
      statusCode: res.response.status,
      body: JSON.stringify({ error: res.response.data }),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: HTTP_STATUSES.INTERNAL_SERVER_ERROR,
      body: JSON.stringify({ error: 'server error' }),
    };
  }
};
