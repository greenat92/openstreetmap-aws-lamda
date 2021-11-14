const OPEN_STREET_MAP_API_URI =
  process.env.OPEN_STREET_MAP_API_URI ||
  'https://www.openstreetmap.org/api/0.6/map';

const HTTP_STATUSES = {
  SUCCESS: 200,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};
module.exports = {
  HTTP_STATUSES,
  OPEN_STREET_MAP_API_URI,
};
