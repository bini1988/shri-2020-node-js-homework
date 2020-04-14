const request = require('supertest');
const chai = require('chai');
const spies = require('chai-spies')
const { app } = require('../../../src/server/index');
const settingsMock = require('../../../mocks/settings');

chai.use(spies);

const ApiMock = {
  Settings: {
    fetch: chai.spy.returns(Promise.resolve({ data: settingsMock })),
    save: chai.spy.returns(Promise.resolve()),
    delete: chai.spy.returns(Promise.resolve()),
  },
};
const CIMock = {
  setup: chai.spy.returns(Promise.resolve(settingsMock)),
};

app.locals.api = ApiMock;
app.locals.ci = CIMock;

describe('Server settings routes', function () {
  it('GET api/settings', function () {
    return request(app)
      .get('/api/settings')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => response.body)
      .then(({ data }) => {
        chai.expect(data).to.deep.equal(settingsMock);
        chai.expect(ApiMock.Settings.fetch).to.have.been.called();
      });
  });
  it('POST api/settings', function () {
    return request(app)
      .post('/api/settings')
      .set('Accept', 'application/json')
      .send(settingsMock)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => response.body)
      .then(({ data }) => {
        chai.expect(data).to.deep.equal(settingsMock);
        chai.expect(ApiMock.Settings.save).to.have.been.called.with(settingsMock);
      });
  });
  it('DELETE api/settings', function () {
    return request(app)
      .delete('/api/settings')
      .expect(200)
      .then((response) => response.body)
      .then(() => {
        chai.expect(ApiMock.Settings.delete).to.have.been.called();
      });
  });
});
