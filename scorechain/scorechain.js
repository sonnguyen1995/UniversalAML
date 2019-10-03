const express = require('express');
const scoring = require('./api/scoring');
const reports = require('./api/reports');
const data = require('./api/data');
const customisation = require('./api/customisation');
const alerts = require('./api/alerts');

const scorechain = express();

scorechain.use('/scoring', scoring);
scorechain.use('/reports', reports);
scorechain.use('/data', data);
scorechain.use('/customisation', customisation);
scorechain.use('/alerts', alerts);

module.exports = scorechain;