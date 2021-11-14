/* eslint-disable no-undef */
const { expect } = require('chai');

const { osmToGeoJsonHelper } = require('../../../../api/shared/lib/osmgeojson');
const constants = require('../../../../api/shared/constant');
const { getApiRequest } = require('../../../../api/shared/lib/axios');
const geodata = require('../../__mock__/geodata');

describe('#osmgeojson library', () => {
  it('#Test osmToGeoJsonHelper.', () => {
    expect(osmToGeoJsonHelper).to.be.a('function');
  });

  it('#convert osm to geojson features', async () => {
    const uri = constants.OPEN_STREET_MAP_API_URI;
    const bbox = '?bbox=13.38798,52.52326,13.38954,52.52389';
    const res = await getApiRequest(`${uri}${bbox}`);
    const geojson = osmToGeoJsonHelper(res.data);
    expect(res.status).to.be.equal(200);
    expect(res.data).to.be.a('object');
    expect(res.statusText).to.be.equal('OK');
    await expect(geojson).to.be.a('object');
    await expect(JSON.stringify(geojson)).to.be.equal(
      JSON.stringify(geodata.data),
    );
  });
});
