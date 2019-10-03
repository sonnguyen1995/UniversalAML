const express = require('express');
const scorechain = require('./scorechain/scorechain');

const api = express();

api.use('/scorechain', scorechain);

module.exports = api;