import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import chai, { expect } from 'chai';
import app from '../../index';
import config from '../../config/config';

chai.config.includeStack = true;

describe('## Auth APIs', () => {

  const validUserToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfX3YiOjAsInVzZXJuYW1lIjoiYW5kcmV3IiwicGFzc3dvcmQiOiIkMmEkMDgkaC5WVE11V3F6MlhwMEhjenlhcURLdXducnJiMVl6OS9MWFR5L3NYUGJYSUZ3bkYxMjBGRUsiLCJfaWQiOiI1YTA4OTA1YzYwOWU1NmM2MjRjYjlhNmUiLCJjcmVhdGVkQXQiOiIyMDE3LTExLTEyVDE4OjE4OjA0Ljg5NFoiLCJ2ZXJpZmllZCI6ZmFsc2UsImlhdCI6MTUxMDUxMDY4NSwiZXhwIjoxNjU0NTEwNjg1fQ.VikuupiS5qwXU4Tix_7C2UbSLFHPk4syL6cfcjkQ77A';

  const invalidUserToken = 'invalid.token';

  describe('# POST /api/event', () => {
    it('errors when no auth token sent', (done) => {
      request(app)
        .post('/api/v1/event')
        .expect(httpStatus.UNAUTHORIZED)
        .then((res) => {
          expect(res.body).to.exist; //eslint-disable-line
          done();
        })
        .catch(done);
    });

    it('errors when invalid token sent', (done) => {
      request(app)
        .post('/api/v1/event')
        .set('Authorization', `Bearer ${invalidUserToken}`)
        .expect(httpStatus.UNAUTHORIZED)
        .then((res) => {
          expect(res.body).to.exist; //eslint-disable-line
          done();
        })
        .catch(done);
    });

    it('errors when no body sent', (done) => {
      request(app)
        .post('/api/v1/event')
        .set('Authorization', `Bearer ${validUserToken}`)
        .expect(httpStatus.BAD_REQUEST)
        .then((res) => {
          expect(res.body).to.exist; //eslint-disable-line
          done();
        })
        .catch(done);
    });
  });
});
