/* eslint-disable implicit-arrow-linebreak */
const response = require('../shared/lib/response');

module.exports.notFound = (event, context, callback) =>
  response.json(callback, null, 404);
