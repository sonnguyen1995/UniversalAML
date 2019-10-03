const express = require('express');
const bodyParser = require('body-parser');
const Bitcoin = require('../coins/bitcoin');
const UniversalAML = require('../../universal-aml');
const bitcoin = new Bitcoin();

const reports = express();
reports.use(bodyParser.urlencoded({ extended: false }));
reports.use(bodyParser.json());

var token = 'testToken'; // authorization token
var coin = '';

const getCoin = (req, res, next) => {
    const publicKey = req.params.publicKey;
    (publicKey === bitcoin.publicKey) ? coin = 'bitcoin' : coin = 'ethereum';
    res.send({ coin: coin });
    next();
}

// http://localhost:8080/api/scorechain/report/coin/{publicKey}
reports.get('/coin/:publicKey', getCoin, (req, res, next) => {
    const universalAML = new UniversalAML(req.params.publicKey, 'Scorechain');
    if (coin === 'bitcoin') {
        // http://localhost:8080/api/scorechain/report?token={token}
        reports.get('/', (req, res, next) => {
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
        // http://localhost:8080/api/scorechain/report?token={token}
        reports.post('/', (req, res, next) => {
            const body = {
                report_type: req.body.report_type,
                entity_or_address: req.body.entity_or_address
                // ...
            }
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
        // http://localhost:8080/api/scorechain/report?token={token}
        reports.delete('/', (req, res, next) => {
            const body = {
                id: req.body.id
            }
            if (req.query.token === token) {
                universalAML.reports({
                    reportMethod: 'DELETE', body: body, token: token, callback: data => {
                        res.send(data)
                    }
                })
            } else {
                res.send({ "error": "invalid token" })
            }
        })
    } else if (coin === 'ethereum') {
        // ... 
    }
})

module.exports = reports;