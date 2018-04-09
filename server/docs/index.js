const swaggerJSDoc = require('swagger-jsdoc');
const express = require('express');

const router = express.Router(); // eslint-disable-line new-cap

// Swagger definition aka OpenAPI v2.0
// https://github.com/swagger-api/swagger-spec/blob/master/versions/2.0.md

const swaggerDefinition = {
  info: {
    // API information (required)
    title: 'SEDaily  DevOps', // Title (required)
    version: '1.0.0', // Version (required)
    description: 'Software Engineering Daily Logging, Monitoring, and Analytics API Documentation. You can use these by not only browsing the API routes, but also by executing requests against the server.'
  },
  basePath: '/api/v1',
  produces: ['application/json'],
  consumes: ['application/json'],
};

const options = {
  swaggerDefinition,
  apis: [
    // controllers include parameters, tags and paths
    './server/controllers/*.js',
    // a few "general" paths are defined in index
    './server/routes/*.route.js',
    // responses, securityDefinitions and general definitions/parameters in separate yaml
    './server/docs/*.yaml',
  ]
};
const swaggerSpec = swaggerJSDoc(options);

router.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

router.use('/', express.static(__dirname));

module.exports = router;
