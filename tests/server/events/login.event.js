import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import chai, { expect } from 'chai';
import app from '../../../index';

chai.config.includeStack = true;

describe('## Login Events', () => {
  const loginEvent = {
    clientId: '1234567',
    eventApiEnv: 'test',
    deviceType: 'Android',
    eventTime: new Date().getTime(),
    eventType: 'register',
    eventData: {}
  };
  it('succeed for valig login envent', (done) =>{
    request(app)
      .post('/api/v1/event')
      .send(loginEvent)
      .expect(httpStatus.OK)
      .then((res) => {
        expect(res.body).to.exist; // eslint-disable-line 
        done();
      })
      .catch(done);
  });

  it('errors with invalid eventData', (done) => {
    loginEvent.eventData = { username: 'user' };
    request(app)
      .post('/api/v1/event')
      .send(loginEvent)
      .expect(httpStatus.INTERNAL_SERVER_ERROR)
      .then((res) => {
        expect(res.body).to.exist; // eslint-disable-line
        done();
      })
      .catch(done);
  });
});
