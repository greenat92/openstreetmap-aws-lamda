/* eslint-disable no-undef */
const { expect } = require('chai');
// const { assert } = require('chai');

const getLocation = require('../../../../../modules/locations/endpoints/get');
const locationRes = require('../../../__mock__/getLocationDetailsResopnse');

describe('#Test get location features detail', () => {
  it('#Test get location detail if is a function.', () => {
    expect(getLocation.detail).to.be.a('function');
  });

  it('#get geojson data with correct data', async () => {
    const bbox = '13.38798,52.52326,13.38954,52.52389';
    const event = { queryStringParameters: { bbox } };
    const res = await getLocation.detail(event);
    await expect(res).to.be.a('object');
    await expect(res.statusCode).to.be.equal(200);
    await expect(res.body).to.be.equal(locationRes.response.body);
  });

  it('#get geojson data with correct data', async () => {
    const bbox = '13.38798,52.52326,13.38954';
    const event = { queryStringParameters: { bbox } };
    const res = await getLocation.detail(event);
    await expect(res).to.be.a('object');
    await expect(res.statusCode).to.be.equal(400);
    await expect(res.body).to.be.equal(
      JSON.stringify({
        error:
          'The parameter bbox is required, and must be of the form min_lon,min_lat,max_lon,max_lat.',
      }),
    );
  });
});
