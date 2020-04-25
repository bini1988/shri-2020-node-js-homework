import request from 'supertest';
const chai = require('chai');
const spies = require('chai-spies');
const { app } = require('../../../src/server/index.ts');
const buildsMock = require('../../../mocks/builds');

chai.use(spies);

describe('Server builds routes', function () {
  beforeEach(() => {
    app.locals.api = {
      Build: chai.spy.interface({
        fetchBuilds: () => Promise.resolve({ data: buildsMock }),
        fetchBuild: (buildId) => (buildsMock[0].id === buildId)
            ? Promise.resolve({ data: buildsMock[0] }) : Promise.reject(),
      }),
    };
    app.locals.ci = {
      queueBuild: chai.spy.returns(Promise.resolve(buildsMock[0])),
      logs: chai.spy.interface({
        fetchLogsByBuildId: (buildId) => (buildsMock[0].id === buildId)
          ? Promise.resolve(buildId) : Promise.reject(),
      }),
    };
  });

  describe('GET api/builds', function () {
    it('GET api/builds', function () {
      return request(app)
        .get('/api/builds')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => response.body)
        .then(({ data }) => {
          chai.expect(data)
            .to.deep.equal(buildsMock);
          chai.expect(app.locals.api.Build.fetchBuilds)
            .to.have.been.called();
        });
    });
    it('GET api/builds with offset & limit', function () {
      const offset = 1;
      const limit = 2;

      return request(app)
        .get(`/api/builds?offset=${offset}&limit=${limit}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => response.body)
        .then(({ data }) => {
          chai.expect(data)
            .to.deep.equal(buildsMock);
          chai.expect(app.locals.api.Build.fetchBuilds)
            .to.have.been.called.with(offset, limit);
        });
    });
    it('GET api/builds with invalid offset parameter', function () {
      const offset = -1;

      return request(app)
        .get(`/api/builds?offset=${offset}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => response.body)
        .then(({ error, message }) => {
          chai.expect(error)
          .to.equal('ValidationError');
          chai.expect(message)
            .to.equal('Offset query parameter should be positive integer');
          chai.expect(app.locals.api.Build.fetchBuilds)
            .to.have.not.been.called();
        });
    });
    it('GET api/builds with invalid limit parameter', function () {
      const limit = -1;

      return request(app)
        .get(`/api/builds?limit=${limit}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => response.body)
        .then(({ error, message }) => {
          chai.expect(error)
          .to.equal('ValidationError');
          chai.expect(message)
            .to.equal('Limit query parameter should be positive integer');
          chai.expect(app.locals.api.Build.fetchBuilds)
            .to.have.not.been.called();
        });
    });
  });
  it('POST api/builds/:commitHash', function () {
    const commitHash = '96233c2';

    return request(app)
      .post(`/api/builds/${commitHash}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => response.body)
      .then(({ data }) => {
        chai.expect(data)
          .to.deep.equal(buildsMock[0]);
        chai.expect(app.locals.ci.queueBuild)
          .to.have.been.called.with(commitHash);
      });
  });
  describe('GET api/builds/:buildId', function () {
    it('GET api/builds/:buildId with existing buildId', function () {
      const buildId = buildsMock[0].id;

      return request(app)
        .get(`/api/builds/${buildId}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => response.body)
        .then(({ data }) => {
          chai.expect(data)
            .to.deep.equal(buildsMock[0]);
        });
    });
    it('GET api/builds/:buildId with not existing buildId', function () {
      const buildId = buildsMock[1].id;

      return request(app)
        .get(`/api/builds/${buildId}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404)
        .then((response) => response.body)
        .then(({ error, message }) => {
          chai.expect(error)
            .to.equal('NotFoundError');
          chai.expect(message)
            .to.equal(`Build with id '${buildId}' is not found`);
        });
    });
  });
  describe('GET /builds/:buildId/logs', function () {
    it('GET /builds/:buildId/logs with existing buildId', function () {
      const buildId = buildsMock[0].id;

      return request(app)
        .get(`/api/builds/${buildId}/logs`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => response.body)
        .then(({ data }) => {
          chai.expect(data)
            .to.deep.equal(buildId);
          chai.expect(app.locals.ci.logs.fetchLogsByBuildId)
            .to.have.been.called.with(buildId);
        });
    });
    it('GET /builds/:buildId/logs with not existing buildId', function () {
      const buildId = buildsMock[1].id;

      return request(app)
        .get(`/api/builds/${buildId}/logs`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404)
        .then((response) => response.body)
        .then(({ error, message }) => {
          chai.expect(error)
            .to.equal('NotFoundError');
          chai.expect(message)
            .to.equal(`Log of build with id '${buildId}' is not found`);
        });
    });
  });
});
