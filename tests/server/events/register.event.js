import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import chai, { expect } from 'chai';
import app from '../../../index';

chai.config.includeStack = true;

describe('## Register Events', () => {
  it('sending valid register event is successful', (done) => {
    const event = {
      clientId: '1234567',
      eventApiEnv: 'production',
      deviceType: 'Android',
      eventTime: new Date().getTime(),
      eventType: 'register',
      eventData: {}
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
});
