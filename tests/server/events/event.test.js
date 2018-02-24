import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import chai, { expect } from 'chai';
import app from '../../../index';

chai.config.includeStack = true;

describe('## Basic Event APIs', () => {

  describe('# POST /api/event', () => {

    it('sending basic event is successful', (done) => {
      const event = {
        clientId: '1234567',
        deviceType: 'iOS',
        eventTime: new Date().getTime(),
        eventType: 'login',
        eventData: {
          userId: 'andrew'
        }
      };
      request(app)
        .post('/api/v1/event')
        .send(event)
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

    it('errors when no params are sent', (done) => {
      const event = {};
      request(app)
        .post('/api/v1/event')
        .send(event)
        .expect(httpStatus.BAD_REQUEST)
        .then((res) => {
          expect(res.body).to.exist; //eslint-disable-line
          expect(res.body.message).to.equal('"clientId" is required and "deviceType" is required and "eventTime" is required and "eventType" is required'); //eslint-disable-line
          done();
        })
        .catch(done);
    });

    it('errors when no clientId sent', (done) => {
      const event = {
        deviceType: 'Browser',
        eventTime: new Date().getTime(),
        eventType: 'login',
        eventData: {
          userId: '8675309'
        }
      }
      request(app)
        .post('/api/v1/event')
        .send(event)
        .expect(httpStatus.BAD_REQUEST)
        .then((res) => {
          expect(res.body).to.exist; //eslint-disable-line
          expect(res.body.message).to.equal('"clientId" is required'); //eslint-disable-line
          done();
        })
        .catch(done);
    });

    it('errors when no deviceType sent', (done) => {
      const event = {
        clientId: '45426562',
        eventTime: new Date().getTime(),
        eventType: 'login',
        eventData: {
          userId: '8675309'
        }
      }
      request(app)
        .post('/api/v1/event')
        .send(event)
        .expect(httpStatus.BAD_REQUEST)
        .then((res) => {
          expect(res.body).to.exist; //eslint-disable-line
          expect(res.body.message).to.equal('"deviceType" is required'); //eslint-disable-line
          done();
        })
        .catch(done);
    });

    xit('errors when no eventData sent', (done) => {
      const event = {
        clientId: '45426562',
        deviceType: 'API',
        eventTime: new Date().getTime(),
        eventType: 'login'
      }
      request(app)
        .post('/api/v1/event')
        .send(event)
        .expect(httpStatus.BAD_REQUEST)
        .then((res) => {
          expect(res.body).to.exist; //eslint-disable-line
          expect(res.body.message).to.equal('"eventData" is required'); //eslint-disable-line
          done();
        })
        .catch(done);
    });

    it('errors when no eventType sent', (done) => {
      const event = {
        clientId: '1234567',
        deviceType: 'Android',
        eventTime: new Date().getTime(),
        eventData: {
          userId: '8675309'
        }
      }
      request(app)
        .post('/api/v1/event')
        .send(event)
        .expect(httpStatus.BAD_REQUEST)
        .then((res) => {
          expect(res.body).to.exist; //eslint-disable-line
          expect(res.body.message).to.equal('"eventType" is required'); //eslint-disable-line
          done();
        })
        .catch(done);
    });

    it('errors when no eventTime sent', (done) => {
      const event = {
        clientId: '1234567',
        deviceType: 'iOS',
        eventType: 'login',
        eventData: {
          userId: '8675309'
        }
      }
      request(app)
        .post('/api/v1/event')
        .send(event)
        .expect(httpStatus.BAD_REQUEST)
        .then((res) => {
          expect(res.body).to.exist; //eslint-disable-line
          expect(res.body.message).to.equal('"eventTime" is required'); //eslint-disable-line
          done();
        })
        .catch(done);
    });


  });
});
