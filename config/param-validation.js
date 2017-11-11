import Joi from 'joi';

export default {
  // UPDATE /api/users/:userId
  event: {
    body: {
      clientId: Joi.string().required(),
      deviceType: Joi.string().required(),
      location: Joi.string().required(),
      eventTime: Joi.string().required(),
      eventType: Joi.string().required()
    }
  }

};

/*
validate the event has this model:
  Client id /  username
  Device type (IOS, Android, Browser)
  Location (where is the request originating from)
  EventTime (UTC time the event was published)
  EventType
*/

/*
validate that only these events are allowed
  login
  logout
  play_episode
  pause_episode
  like_episode
  completed_episode
*/