import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import chai, { expect } from 'chai';
import app from '../../index';
import config from '../../config/config';

chai.config.includeStack = true;

describe('## completedEpisode Events', () => {
  
  const event = {
  	clientId: '1234567',
    deviceType: 'iOS',
    eventTime: new Date().getTime(),
    eventType: 'completedEpisode'
  };

  it('sends a valid completedEpisode event', (done) => {
    const validEvent = Object.assign({}, event);
    validEvent.eventData = {
      episodeName: 'Serverless Event-Driven Architechture with Danilo Poccia'
    };
    let eventId;
    request(app)
      .post('/api/v1/event')
      .send(validEvent)
      .expect(httpStatus.OK)
      .then((res) => {
        eventId = res.body.eventId;
        expect(res.body).to.exist; //eslint-disable-line
      })
      .then((lastEvent) => {
        expect(eventId).to.equal(lastEvent); //eslint-disable-line
        done();
      })
      .catch(done);
  });

  it('fails when no episodeName is given', (done) => {
    request(app)
      .post('/api/v1/event')
      .send(event)
      .expect(httpStatus.INTERNAL_SERVER_ERROR)
      .then((res) => {
        expect(res.body).to.exist; //eslint-disable-line
        done();
      })
      .catch(done);
  });

  it('fails when empty episodeName is given', (done) => {
    const invalidEvent = Object.assign({}, event);
    invalidEvent.eventData = {
      episodeName: ''
    };
    request(app)
      .post('/api/v1/event')
      .send(invalidEvent)
      .expect(httpStatus.INTERNAL_SERVER_ERROR)
      .then((res) => {
        expect(res.body).to.exist; //eslint-disable-line
        done();
      })
      .catch(done);
  });
});
