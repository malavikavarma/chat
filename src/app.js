const path = require('path');
const favicon = require('serve-favicon');
const compress = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('./logger');

const feathers = require('@feathersjs/feathers');
const configuration = require('@feathersjs/configuration');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');

const services = require('./services');
const appHooks = require('./app.hooks');
const channels = require('./channels');

const sequelize = require('./sequelize');

import swagger from 'feathers-swagger';
import generateSwagger from 'feathers-swagger-sequelize';
const cookieParser = require('cookie-parser');

const app = express(feathers());

// Load apsp configuration
app.configure(configuration());
app.use(cookieParser());
// Enable security, CORS, compression, favicon and body parsing
app.use(helmet());
app.use(cors());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));
// Host the public folder
app.use('/', express.static(app.get('public')));

// Set up Plugins and providers
app.configure(express.rest());
app.configure(socketio());

app.configure(sequelize);

// Configure other middleware (see `middleware/index.js`)
// Set up our services (see `services/index.js`)
app.configure(express.rest()).configure(
  swagger({
    uiIndex: true,
    docsPath: '/docs',
    info: {
      title: 'API Documentation',
      description: 'API Documentation'
    }
  })
);
app.configure(services);
app.configure(generateSwagger);
// Set up event channels (see channels.js)
app.configure(channels);

// Configure a middleware for 404s and the error handler
app.use(express.notFound());
app.use(express.errorHandler({ logger }));

app.hooks(appHooks);

module.exports = app;
