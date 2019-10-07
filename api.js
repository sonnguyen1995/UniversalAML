const express = require('express');
const scorechain = require('./scorechain/scorechain');
const coinfirm = require('./coinfirm/coinfirm');

const api = express();

api.use('/scorechain', scorechain);
api.use('/coinfirm', coinfirm);

module.exports = api;