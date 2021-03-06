/* eslint-disable no-undef */
const { expect } = require('chai');

const constants = require('../../../../api/shared/constant');
const axios = require('../../../../api/shared/lib/axios');

describe('#axios library', () => {
  it('#Test getApiRequest function', () => {
    expect(axios.getApiRequest).to.be.a('function');
  });

  it('#get a simple api call with wrong uri', async () => {
    const uri = constants.OPEN_STREET_MAP_API_URI;
    const res = await axios.getApiRequest(uri);
    expect(res.response.status).to.be.equal(400);
    expect(res.response.data).to.be.equal(
      'The parameter bbox is required, and must be of the form min_lon,min_lat,max_lon,max_lat.',
    );
    expect(res.response.statusText).to.be.equal('Bad Request');
  });

  it('#get a simple api call with correct data', async () => {
    const uri = constants.OPEN_STREET_MAP_API_URI;
    const bbox = '?bbox=13.38798,52.52326,13.38954,52.52389';
    const res = await axios.getApiRequest(`${uri}${bbox}`);
    expect(res.status).to.be.equal(200);
    expect(res.data).to.be.a('object');
    expect(res.statusText).to.be.equal('OK');
  });
});
