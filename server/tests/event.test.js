import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import chai, { expect } from 'chai';
import app from '../../index';
import config from '../../config/config';

chai.config.includeStack = true;

describe('## Auth APIs', () => {
  const validEvent = {
    clientId: '1234567',
    deviceType: 'iOS',
    location: 'Tacoma',
    eventTime: new Date(),
    eventType: 'login'
  };

  const invalidEvent = {
    clientId: '1234567',
    deviceType: 'iOS',
    eventTime: new Date(),
    eventType: 'login'
  };

  describe('# POST /api/event', () => {
    it('should work', (done) => {
      request(app)
        .post('/api/event')
        .send(validEvent)
        .expect(httpStatus.OK)
        .then((res) => {
          done();
        })
        .catch(done);
    });

    it('should NOT work', (done) => {
      request(app)
        .post('/api/event')
        .send(invalidEvent)
        .expect(httpStatus.BAD_REQUEST)
        .then((res) => {
          done();
        })
        .catch(done);
    });
  });
});
