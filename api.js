require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const scorechain = require('./scorechain/scorechain');

const api = express();

scorechain.use(bodyParser.urlencoded({ extended: false }));
scorechain.use(bodyParser.json());
api.use('/scorechain', scorechain);

module.exports = api;