import Joi from 'joi';
import EventStream from '../../api/EventStream';
import paramValidation from '../../config/param-validation';
import APIError from '../helpers/APIError';
import InluxIF from '../helpers/influx-if';

const producer = new EventStream.EventStreamProducer();
const influxIf = new InluxIF();

function validateEventType(req, res, next) {
  Joi.validate(req.body.eventData, paramValidation[req.body.eventType], (error) => {
    if (error) {
      var err = new APIError(error); //eslint-disable-line
      next(err);
    } else {
      next();
    }
  });
}

function queryEventType(req, res, next) {
  const eventType = req.query.eventType
  
  influxIf.read(eventType).then(result => {
    res.json(result)
  })
  .catch(error => {
    var err = new APIError(error); //eslint-disable-line
      next(err);
    })
}


function newEvent(req, res, next) {
  const { eventType } = req.body;
  producer.sendMessage(eventType, JSON.stringify(req.body), (error, eventId) => {
    if (error) {
      var err = new APIError(error); //eslint-disable-line
      next(err);
    } else {
      res.json({ eventId });
    }
  });
  influxIf.write(eventType, req.body, function(error){
    if (error) {
      console.log(error)
    }
  })
}

export default { validateEventType, newEvent, queryEventType };
