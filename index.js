require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const api = require('./api');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', api);

const port = process.env.PORT || 8080;
const httpServer = require('http').createServer(app);

httpServer.listen(port, function () {
  console.log(`universalAML-server running on port ${port}.`);
});
