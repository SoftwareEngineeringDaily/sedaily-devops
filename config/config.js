import Joi from 'joi';

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();

// define validation for all the env vars
const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow(['development', 'production', 'test', 'provision'])
    .default('development'),
  PORT: Joi.number()
    .default(3000),
  JWT_SECRET: Joi.string().required()
    .description('JWT Secret required to sign'),
  REDIS_HOST: Joi.string().required()
    .description('Host URL for Redis server'),
  REDIS_PORT: Joi.number()
    .default(6379),
  INFLUXDB_HOST: Joi.string().required()
    .description('Host URL for InfluxDB server'),
  INFLUXDB_PORT: Joi.number()
    .default(8086),
  INFLUXDB_USER: Joi.string().required()
    .description('Username for InfluxDB server'),
  INFLUXDB_PASS: Joi.string().required()
    .description('Password for InfluxDB server')
}).unknown()
  .required();

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  jwtSecret: envVars.JWT_SECRET,
  redis: {
    host: envVars.REDIS_HOST,
    port: envVars.REDIS_PORT
  },
  influx: {
    host: envVars.INFLUXDB_HOST,
    port: envVars.INFLUXDB_PORT,
    username: envVars.INFLUXDB_USER,
    password: envVars.INFLUXDB_PASS
  }
};

export default config;
