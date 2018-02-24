import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import chai, { expect } from 'chai';
import app from '../../../index';

chai.config.includeStack = true;

describe('## Basic Event APIs', () => {

  const event = {
    clientId: '1234567',
    deviceType: 'iOS',
    eventTime: new Date().getTime()
  };

  describe('# POST /api/event', () => {

    it('sending basic event is successful', (done) => {
      const newEvent = Object.assign({}, event);
      newEvent.eventData = {
        userId: 'andrew'
      };
      newEvent.eventType = 'login';
      request(app)
        .post('/api/v1/event')
        .send(newEvent)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.exist; //eslint-disable-line
          done();
        })
        .catch(done);
    });

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

    it('errors when no eventType sent', (done) => {
      const newEvent = Object.assign({}, event);
      request(app)
        .post('/api/v1/event')
        .send(newEvent)
        .expect(httpStatus.BAD_REQUEST)
        .then((res) => {
          expect(res.body).to.exist; //eslint-disable-line
          expect(res.body.message).to.equal('"eventType" is required'); //eslint-disable-line
          done();
        })
        .catch(done);
    });
  });
});
