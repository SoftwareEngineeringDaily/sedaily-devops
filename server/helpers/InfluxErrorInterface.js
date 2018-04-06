import _ from 'lodash';
import { FieldType, escape } from 'influx';
import InfluxInterface from './InfluxInterface';
import paramValidation from '../../config/param-validation';

const fieldList = Object.keys(paramValidation.error.body);
fieldList.splice(fieldList.indexOf('errorData'), 1);

Object.keys(paramValidation.error.body.errorData).forEach((key) => {
  const inner = paramValidation.error.body.errorData[key];

  if (inner && inner.children) {
    inner.children.forEach((child) => {
      fieldList.push(child.key);
    });
  }
});

const fields = {};
Array.from(new Set(fieldList)).forEach((field) => {
  fields[field] = FieldType.STRING;
});

const databaseName = 'errorsDb';

export default class InfluxErrorInterface extends InfluxInterface {
  constructor() {
    super(databaseName, [
      {
        measurement: 'errors',
        fields,
        tags: []
      }
    ]);
  }

  write(topic, errorData, callback) {
    _.merge(errorData, errorData.errorData);
    delete errorData.errorData; // eslint-disable-line no-param-reassign
    this.influx.writeMeasurement('errors', [
      {
        fields: { ...errorData }
      }
    ])
      .then(() => {
        callback(null);
      })
      .catch((err) => {
        callback(`Error saving data to InfluxDB! ${err.message}`);
      });
  }

  read(errorType) {
    return this.influx.query(`select * from errors where eventType = ${escape.stringLit(errorType)}`);
  }
}
