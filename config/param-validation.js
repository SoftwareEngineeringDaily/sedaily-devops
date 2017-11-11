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
{ topic: 'login', partition: 0 },
+        { topic: 'logout', partition: 0 },
+        { topic: 'play_episode', partition: 0 },
+        { topic: 'pause_episode', partition: 0 },
+        { topic: 'like_episode', partition: 0 },
+        { topic: 'completed_episode', partition: 0 }
*/