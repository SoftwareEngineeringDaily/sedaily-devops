import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import chai, { expect } from 'chai';
import app from '../../../index';

chai.config.includeStack = true;

describe('## Basic Event APIs', () => {
  it('sending valid event is successful', (done) => {
    const event = {
      clientId: '1234567',
      eventApiEnv: 'test',
      deviceType: 'iOS',
      eventTime: new Date().getTime(),
      eventType: 'login',
      eventData: {
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

  it('errors with invalid deviceType', (done) => {
    const event = {
      clientId: '1234567',
      eventApiEnv: 'production',
      deviceType: 'Windows phone',
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
        expect(res.body.message).to.equal('"deviceType" must be one of [iOS, Android, Browser, API]'); //eslint-disable-line
        done();
      })
      .catch(done);
  });

  it('errors with invalid timestamp', (done) => {
    const event = {
      clientId: '1234567',
      eventApiEnv: 'production',
      deviceType: 'Browser',
      eventTime: new Date(),
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
        expect(res.body.message).to.equal('"eventTime" must be a valid timestamp or number of seconds'); //eslint-disable-line
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
        expect(res.body.message).to.equal('"clientId" is required and "deviceType" is required and "eventApiEnv" is required and "eventTime" is required and "eventData" is required and "eventType" is required'); //eslint-disable-line
        done();
      })
      .catch(done);
  });

  it('errors when no clientId sent', (done) => {
    const event = {
      deviceType: 'Browser',
      eventApiEnv: 'production',
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
      eventApiEnv: 'production',
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

  it('errors when no eventData sent', (done) => {
    const event = {
      clientId: '45426562',
      eventApiEnv: 'production',
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
      eventApiEnv: 'production',
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
      eventApiEnv: 'production',
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

  it('errors when no eventApiEnv sent', (done) => {
    const event = {
      clientId: '1234567',
      deviceType: 'iOS',
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
        expect(res.body.message).to.equal('"eventApiEnv" is required'); //eslint-disable-line
        done();
      })
      .catch(done);
  });

  it('errors when eventApiEnv sent is wrong type', (done) => {
    const event = {
      clientId: '1234567',
      deviceType: 'iOS',
      eventApiEnv: 'testing',
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
        expect(res.body.message).to.equal('"eventApiEnv" must be one of [production, test]'); //eslint-disable-line
        done();
      })
      .catch(done);
  });
});
