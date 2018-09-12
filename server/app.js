const keyPublishable = 'pk_test_HxxhTNdpMipOAsqzZw2mXJol';
const keySecret = 'sk_test_vh4AudxzgLj9hwOKfH62cILt';

var createError = require('http-errors');
var express = require('express');
const stripe = require("stripe")(keySecret);
var logger = require('morgan');
const bodyParser = require('body-parser');
var mysql = require('mysql');
var db = require('./config/db');
var app = express();

// view engine setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, x-access-token, x-origin, Authorization, Access-Control-Allow-Headers, Origin, Accept');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Expose-Headers', 'totalRecords');
  next();
});

// Require our routes into the application.
require('./routes')(app);
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));


module.exports = app;
