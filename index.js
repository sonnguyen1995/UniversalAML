require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const UniversalAML = require('./universal-aml');
const universalAML = new UniversalAML();

universalAML.publicKey = '123';
universalAML.AMLProvider = 'Scorechain';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

const port = process.env.PORT || 8080;
const httpServer = require('http').createServer(app);

app.get('/', (req, res, next) => {
  // universalAML.scoring({
  //   scoringType: 'transaction',
  //   hash: 'testing',
  //   direction: 'incoming',
  //   callback: data => {
  //     res.send(data)
  //   }
  // });
  const token = req.query.token;
  universalAML.reports('GET', data => {
    res.send(data)
  });
});
httpServer.listen(port, function () {
  console.log(`universalAML-server running on port ${port}.`);
});
