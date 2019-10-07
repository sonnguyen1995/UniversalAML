const express = require('express');
const reports = require('./api/reports');

const coinfirm = express();

coinfirm.use('/reports', reports);

module.exports = coinfirm;