const osmtogeojson = require('osmtogeojson');

const osmToGeoJsonHelper = (osmData) => osmtogeojson(osmData);

module.exports = { osmToGeoJsonHelper };
