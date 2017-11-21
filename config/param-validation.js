import Joi from 'joi';

export default {
  event: {
    body: {
      clientId: Joi.string().required(),
      deviceType: Joi.string().required().valid(['iOS', 'Android', 'Browser']),
      location: Joi.string().required(),
      eventTime: Joi.date().timestamp('unix').required(),
      eventData: Joi.object(),
      eventType: Joi.string().required().valid(
        [
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
  loginEvent: {

  },
  logoutEvent: {

  },
  playEpisode: {
    episodeName: Joi.string().required(),
    minutesPlayed: Joi.number().required(),
    minutesRemaining: Joi.number().required()
  },
  pauseEpisode: {
    episodeName: Joi.string().required(),
    minutesPlayed: Joi.number().required(),
    minutesRemaining: Joi.number().required()
  },
  likeEpisode: {
    episodeName: Joi.string().required(),
    minutesPlayed: Joi.number().required(),
    minutesRemaining: Joi.number().required()
  },
  completedEpisode: {
    episodeName: Joi.string().required()
  },
  fastForwardEpisode: {
    episodeName: Joi.string().required(),
    minutesPlayed: Joi.number().required(),
    minutesRemaining: Joi.number().required()
  },
  rewindEpisode: {
    episodeName: Joi.string().required(),
    minutesPlayed: Joi.number().required(),
    minutesRemaining: Joi.number().required()
  },
  seekEpisode: {
    episodeName: Joi.string().required(),
    minutesPlayed: Joi.number().required(),
    minutesRemaining: Joi.number().required()
  },
  searchEpisode: {
    episodeName: Joi.string().required()
  }
};
