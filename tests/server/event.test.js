import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import chai, { expect } from 'chai';
import app from '../../index';
import config from '../../config/config';

chai.config.includeStack = true;

describe('## Auth APIs', () => {

  const invalidUserToken = 'invalid.token';

  describe('# POST /api/event', () => {

    it('errors when no body sent', (done) => {
      request(app)
        .post('/api/v1/event')
        .expect(httpStatus.BAD_REQUEST)
        .then((res) => {
          expect(res.body).to.exist; //eslint-disable-line
          done();
        })
        .catch(done);
    });
  });
});
