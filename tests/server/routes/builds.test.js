const request = require('supertest');
const chai = require('chai');
const spies = require('chai-spies');
const { app } = require('../../../src/server/index');
const buildsMock = require('../../../mocks/builds');

chai.use(spies);

describe('Server builds routes', function () {
  beforeEach(() => {
    app.locals.api = {
      Build: {
        fetchBuilds: chai.spy.returns(
          Promise.resolve({ data: buildsMock })
        ),
      },
    };
    app.locals.ci = {
      run: chai.spy.returns(Promise.resolve(buildsMock[0])),
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
            .to.equal('Error: Offset query parameter should be positive integer');
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
            .to.equal('Error: Limit query parameter should be positive integer');
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
        chai.expect(app.locals.ci.run)
          .to.have.been.called.with(commitHash);
      });
  });

});
