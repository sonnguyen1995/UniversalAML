require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const Sherpaa = require('./sherpaa-api');
const sherpaa = new Sherpaa();

sherpaa.publicKey = '123';
sherpaa.AMLProvider = 'Scorechain';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

const port = process.env.PORT || 8080;
const httpServer = require('http').createServer(app);

app.get('/', (req, res, next) => {
  // sherpaa.scoring({
  //   scoringType: 'transaction',
  //   hash: 'testing',
  //   direction: 'incoming',
  //   callback: data => {
  //     res.send(data)
  //   }
  // });
  const token = req.query.token;
  sherpaa.reports('GET', data => {
    res.send(data)
  });
});
httpServer.listen(port, function () {
  console.log(`sherpaa-server running on port ${port}.`);
});
