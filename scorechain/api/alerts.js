const express = require('express');
const bodyParser = require('body-parser');
const Bitcoin = require('../coins/bitcoin');
const UniversalAML = require('../../universal-aml');
const bitcoin = new Bitcoin();

const alerts = express();
alerts.use(bodyParser.urlencoded({ extended: false }));
alerts.use(bodyParser.json());

var token = 'testToken'; // authorization token
var coin = '';

const getCoin = (req, res, next) => {
    const publicKey = req.params.publicKey;
    (publicKey === bitcoin.publicKey) ? coin = 'bitcoin' : coin = 'ethereum';
    res.send({ coin: coin });
    next();
}

alerts.get('/coin/:publicKey', getCoin, (req, res, next) => {
    const universalAML = new UniversalAML(req.params.publicKey, 'Scorechain');
    if (coin === 'bitcoin') {
        alerts.get('/', (req, res, next) => {
            if (req.query.token === token) {
                universalAML.alerts({
                    alertMethod: 'GET', token: token, callback: data => {
                        res.send(data)
                    }
                })
            } else {
                res.send({ "error": "invalid token" })
            }
        })
        alerts.post('/', (req, res, next) => {
            const body = {
                type: req.body.type,
                address: req.body.address,
                entity_of_address: req.body.entity_of_address
                // ...
            }
            console.log(body)
            if (req.query.token === token) {
                universalAML.alerts({
                    alertMethod: 'POST', body: body, token: token, callback: data => {
                        res.send(data)
                    }
                })
            } else {
                res.send({ "error": "invalid token" })
            }
        })
        alerts.delete('/', (req, res, next) => {
            const body = {
                id: req.body.id
            }
            if (req.query.token === token) {
                universalAML.alerts({
                    alertMethod: 'DELETE', body: body, token: token, callback: data => {
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

module.exports = alerts;