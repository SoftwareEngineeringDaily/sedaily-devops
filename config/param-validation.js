import Joi from 'joi';

export default {
  // UPDATE /api/event
  event: {
    body: {
      clientId: Joi.string().required(),
      deviceType: Joi.string().required().valid(['iOS', 'Android', 'Browser']),
      location: Joi.string().required(),
      eventTime: Joi.date().timestamp('unix').required(),
      eventType: Joi.string().required().valid(
        [
          'login',
          'logout',
          'play_episode',
          'pause_episode',
          'like_episode',
          'completed_episode'
        ])
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
