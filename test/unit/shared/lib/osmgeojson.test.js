/* eslint-disable no-undef */
const { expect } = require('chai');
// const { assert } = require('chai');

const osmgeojson = require('../../../../shared/lib/osmgeojson');
const constants = require('../../../../shared/constant');
const axios = require('../../../../shared/lib/axios');
const geodata = require('../../__mock__/geodata');

describe('#osmgeojson library', () => {
  it('#Test osmToGeoJsonHelper.', () => {
    expect(osmgeojson.osmToGeoJsonHelper).to.be.a('function');
  });

  it('#convert osm to geojson', async () => {
    const uri = constants.STREET_MAP_API;
    const bbox = '?bbox=13.38798,52.52326,13.38954,52.52389';
    const res = await axios.getApiRequest(`${uri}${bbox}`);
    const geojson = osmgeojson.osmToGeoJsonHelper(res.data);
    expect(res.status).to.be.equal(200);
    expect(res.data).to.be.a('object');
    expect(res.statusText).to.be.equal('OK');
    await expect(geojson).to.be.a('object');
    await expect(JSON.stringify(geojson)).to.be.equal(
      JSON.stringify(geodata.data),
    );
  });
});
