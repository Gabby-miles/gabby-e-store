const express = require('express');
const bodyParser = require('body-parser');

const config = require('./config.js');

module.exports = function(app) {

  app.use(express.static(config.paths.public));

  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
};
