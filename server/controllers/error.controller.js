import APIError from '../helpers/APIError';
import InluxInterface from '../helpers/InfluxErrorInterface';

const influxInterface = new InluxInterface();

function newError(req, res, next) {
  const { errorType } = req.body;
  influxInterface.write(errorType, req.body, (error) => {
    if (error) {
      const err = new APIError(error); //eslint-disable-line
      next(err);
    } else {
      res.json({ result: 'success' });
    }
  });
}

export default { newError };
