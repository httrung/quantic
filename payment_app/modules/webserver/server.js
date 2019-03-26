const express = require('express');
const compress = require('compression');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const bearerToken = require('express-bearer-token');

const sizeLimit = '50mb';

const app = express();

app.use(helmet());
app.use(cors());
app.use(bearerToken());
// Use gzip
app.use(compress());

// get information from html forms
app.use(bodyParser.json({limit: sizeLimit}));
app.use(bodyParser.urlencoded({
	limit: sizeLimit,
	extended: true
}));

// read cookies (needed for auth)
app.use(cookieParser());

// Make app accessible to others
module.exports = app;