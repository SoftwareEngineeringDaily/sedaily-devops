import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import chai, { expect } from 'chai';
import app from '../../index';
import config from '../../config/config';
import { ConsumerSlice } from './helpers/ConsumerSlice';

const consumerSlice = new ConsumerSlice();

chai.config.includeStack = true;

xdescribe('## completedEpisode Events', () => {
  const validUserToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfX3YiOjAsInVzZXJuYW1lIjoiYW5kcmV3IiwicGFzc3dvcmQiOiIkMmEkMDgkaC5WVE11V3F6MlhwMEhjenlhcURLdXducnJiMVl6OS9MWFR5L3NYUGJYSUZ3bkYxMjBGRUsiLCJfaWQiOiI1YTA4OTA1YzYwOWU1NmM2MjRjYjlhNmUiLCJjcmVhdGVkQXQiOiIyMDE3LTExLTEyVDE4OjE4OjA0Ljg5NFoiLCJ2ZXJpZmllZCI6ZmFsc2UsImlhdCI6MTUxMDUxMDY4NSwiZXhwIjoxNjU0NTEwNjg1fQ.VikuupiS5qwXU4Tix_7C2UbSLFHPk4syL6cfcjkQ77A';

  const invalidUserToken = 'invalid.token';

  const event = {
  	clientId: '1234567',
    deviceType: 'iOS',
    location: 'Tacoma',
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
      .set('Authorization', `Bearer ${validUserToken}`)
      .send(validEvent)
      .expect(httpStatus.OK)
      .then((res) => {
        eventId = res.body.eventId;
        expect(res.body).to.exist; //eslint-disable-line
        return consumerSlice.getLastTopicEvent('completedEpisode');
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
      .set('Authorization', `Bearer ${validUserToken}`)
      .send(event)
      .expect(httpStatus.INTERNAL_SERVER_ERROR)
      .then((res) => {
        // expect(res.body).to.exist; //eslint-disable-line
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
      .set('Authorization', `Bearer ${validUserToken}`)
      .send(invalidEvent)
      .expect(httpStatus.INTERNAL_SERVER_ERROR)
      .then((res) => {
        // expect(res.body).to.exist; //eslint-disable-line
        done();
      })
      .catch(done);
  });
});
