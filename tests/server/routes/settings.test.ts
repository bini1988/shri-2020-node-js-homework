import request from 'supertest';
const chai = require('chai');
const spies = require('chai-spies');
const { app } = require('../../../src/server/index.ts');
const settingsMock = require('../../../mocks/settings');
const setupMock = require('../../../mocks/setup');

chai.use(spies);

describe('Server settings routes', function () {
  beforeEach(() => {
    app.locals.api = {
      Settings: {
        fetch: chai.spy.returns(Promise.resolve({ data: settingsMock })),
        save: chai.spy.returns(Promise.resolve()),
        remove: chai.spy.returns(Promise.resolve()),
      },
    };
    app.locals.ci = {
      setup: chai.spy.returns(Promise.resolve(setupMock)),
    };
  });

  it('GET api/settings', function () {
    return request(app)
      .get('/api/settings')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => response.body)
      .then(({ data }) => {
        chai.expect(data).to.deep.equal(settingsMock);
        chai.expect(app.locals.api.Settings.fetch).to.have.been.called();
      });
  });
  describe('POST api/settings', function () {
    it('POST correct settings', function () {
      return request(app)
        .post('/api/settings')
        .set('Accept', 'application/json')
        .send(settingsMock)
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => response.body)
        .then(({ data: { settings, build } = {} }) => {
          chai.expect(settings).to.deep.equal(settingsMock);
          chai.expect(build).to.deep.equal(setupMock);
          chai.expect(app.locals.api.Settings.save)
            .to.have.been.called.with(settingsMock);
          chai.expect(app.locals.ci.setup)
            .to.have.been.called.with(settings);
        });
    });
    it('POST empty repo name setting', function () {
      return request(app)
        .post('/api/settings')
        .set('Accept', 'application/json')
        .send({ ...settingsMock, repoName: undefined })
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => response.body)
        .then(({ error, message }) => {
          chai.expect(error)
            .to.equal('ValidationError');
          chai.expect(message)
            .to.equal('The name of the repo is required');
          chai.expect(app.locals.api.Settings.save)
            .to.have.not.been.called();
        });
    });
    it('POST empty build command setting', function () {
      return request(app)
        .post('/api/settings')
        .set('Accept', 'application/json')
        .send({ ...settingsMock, buildCommand: undefined })
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => response.body)
        .then(({ error, message }) => {
          chai.expect(error)
            .to.equal('ValidationError');
          chai.expect(message)
            .to.equal('The build command is required');
          chai.expect(app.locals.api.Settings.save)
            .to.have.not.been.called();
        });
    });
  });
  it('DELETE api/settings', function () {
    return request(app)
      .delete('/api/settings')
      .expect(200)
      .then((response) => response.body)
      .then(() => {
        chai.expect(app.locals.api.Settings.remove)
          .to.have.been.called();
      });
  });
});
