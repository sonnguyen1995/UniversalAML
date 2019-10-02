require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const scoring = require('./api/scoring');
const report = require('./api/report');

const scorechain = express();

scorechain.use(bodyParser.urlencoded({ extended: false }));
scorechain.use(bodyParser.json());
scorechain.use('/scoring', scoring);
scorechain.use('/report', report);

module.exports = scorechain;