require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const Bitcoin = require('../../coins/bitcoin-api');
const UniversalAML = require('../../universal-aml');
const bitcoin = new Bitcoin();
const universalAML = new UniversalAML('123', 'Scorechain');

const report = express();
report.use(bodyParser.urlencoded({ extended: false }));
report.use(bodyParser.json());

var token = 'testToken'; // authorization token
var coin = '';

const getCoin = (req, res, next) => {
    const publicKey = req.params.publicKey;
    (publicKey === bitcoin.publicKey) ? coin = 'bitcoin' : coin = 'ethereum';
    res.send({ coin: coin });
    next();
}

report.get('/coin/:publicKey', getCoin, (req, res, next) => {
    if (coin === 'bitcoin') {
        report.get('/', (req, res, next) => {
            if (req.query.token === token) {
                universalAML.reports({
                    reportMethod: 'GET', token: token, callback: data => {
                        res.send(data)
                    }
                })
            } else {
                res.send({ "error": "invalid token" })
            }
        })
        report.post('/', (req, res, next) => {
            const body = {
                report_type: req.body.report_type,
                entity_or_address: req.body.entity_or_address
                // ...
            }
            console.log(body)
            if (req.query.token === token) {
                universalAML.reports({
                    reportMethod: 'POST', body: body, token: token, callback: data => {
                        res.send(data)
                    }
                })
            } else {
                res.send({ "error": "invalid token" })
            }
        })
    }
})

module.exports = report;