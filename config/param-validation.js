import Joi from 'joi';

export default {
  event: {
    body: {
      clientId: Joi.string().required(),
      deviceType: Joi.string().required().valid(['iOS', 'Android', 'Browser', 'API']),
      //location: Joi.string().required(),
      eventTime: Joi.date().timestamp('unix').required(),
      eventData: Joi.object(),
      eventType: Joi.string().required().valid([
        'apiError',
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
  register: Joi.object().required().keys(),
  apiError: Joi.object().required().keys({
    message: Joi.string().required()
  }),
  login: Joi.object().required().keys({
    userId: Joi.string().required()
  }),
  logout: Joi.object().required().keys({
    userId: Joi.string().required()
  }),
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
