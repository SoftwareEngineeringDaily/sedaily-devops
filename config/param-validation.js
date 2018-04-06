import Joi from 'joi';

export default {
  event: {
    body: {
      clientId: Joi.string().required(),
      deviceType: Joi.string().required().valid(['iOS', 'Android', 'Browser', 'API']),
      eventApiEnv: Joi.string().required().valid(['production', 'test']),
      eventTime: Joi.date().timestamp('unix').required(),
      eventData: Joi.object().required(),
      eventType: Joi.string().required().valid([
        'register',
        'login',
        'logout',
        'playEpisode',
        'pauseEpisode',
        'likeEpisode',
        'completedEpisode',
        'fastForwardEpisode',
        'rewindEpisode',
        'seekEpisode',
        'searchEpisode'
      ])
    }
  },
  error: {
    body: {
      clientId: Joi.string().required(),
      deviceType: Joi.string().required().valid(['iOS', 'Android', 'Browser', 'API']),
      eventApiEnv: Joi.string().required().valid(['production', 'test']),
      errorTime: Joi.date().timestamp('unix').required(),
      errorType: Joi.string().required().valid([
        'auth',
        'other'
      ]),
      errorData: Joi.object().required().keys({
        message: Joi.string().required()
      })
    }
  },
  register: Joi.object().required().keys(),
  login: Joi.object().required().keys(),
  logout: Joi.object().required().keys(),
  playEpisode: Joi.object().required().keys({
    episodeName: Joi.string().required(),
    minutesPlayed: Joi.number().required(),
    minutesRemaining: Joi.number().required()
  }),
  pauseEpisode: Joi.object().required().keys({
    episodeName: Joi.string().required(),
    minutesPlayed: Joi.number().required(),
    minutesRemaining: Joi.number().required()
  }),
  likeEpisode: Joi.object().required().keys({
    episodeName: Joi.string().required(),
    minutesPlayed: Joi.number().required(),
    minutesRemaining: Joi.number().required()
  }),
  completedEpisode: Joi.object().required().keys({
    episodeName: Joi.string().required()
  }),
  fastForwardEpisode: Joi.object().required().keys({
    episodeName: Joi.string().required(),
    minutesPlayed: Joi.number().required(),
    minutesRemaining: Joi.number().required()
  }),
  rewindEpisode: Joi.object().required().keys({
    episodeName: Joi.string().required(),
    minutesPlayed: Joi.number().required(),
    minutesRemaining: Joi.number().required()
  }),
  seekEpisode: Joi.object().required().keys({
    episodeName: Joi.string().required(),
    minutesPlayed: Joi.number().required(),
    minutesRemaining: Joi.number().required()
  }),
  searchEpisode: Joi.object().required().keys({
    episodeName: Joi.string().required()
  })
};
