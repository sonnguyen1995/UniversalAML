const express = require('express');
const bodyParser = require('body-parser');
const Bitcoin = require('../coins/bitcoin');
const UniversalAML = require('../../universal-aml');
const bitcoin = new Bitcoin();

const data = express();
data.use(bodyParser.urlencoded({ extended: false }));
data.use(bodyParser.json());

var token = 'testToken'; // authorization token
var coin = '';

const getCoin = (req, res, next) => {
    const publicKey = req.params.publicKey;
    (publicKey === bitcoin.publicKey) ? coin = 'bitcoin' : coin = 'ethereum';
    res.send({ coin: coin });
    next();
}

// http://localhost:8080/api/scorechain/data/coin/{publicKey}
data.get('/coin/:publicKey', getCoin, (req, res, next) => {
    const universalAML = new UniversalAML(req.params.publicKey, 'Scorechain');
    if (coin === 'bitcoin') {
        // http://localhost:8080/api/scorechain/data/status?token={token}
        data.get('/status', (req, res, next) => {
            if (req.query.token === token) {
                universalAML.data({
                    dataType: 'status', token: token, callback: data => {
                        res.send(data)
                    }
                })
            } else {
                res.send({ "error": "invalid token" })
            }
        })
        // http://localhost:8080/api/scorechain/data/tx/{hash}?token={token}
        data.get('/tx/:hash', (req, res, next) => {
            const hash = req.params.hash;
            if (req.query.token === token) {
                universalAML.data({
                    dataType: 'transaction', hash: hash, token: token, callback: data => {
                        res.send(data)
                    }
                })
            } else {
                res.send({ "error": "invalid token" })
            }
        })
        // http://localhost:8080/api/scorechain/data/address/{address}?token={token}
        data.get('/address/:address', (req, res, next) => {
            const address = req.params.address;
            if (req.query.token === token) {
                universalAML.data({
                    dataType: 'transaction', address: address, token: token, callback: data => {
                        res.send(data)
                    }
                })
            } else {
                res.send({ "error": "invalid token" })
            }
        })
        // http://localhost:8080/api/scorechain/data/entity/{address}?token={token}
        data.get('/entity/:address', (req, res, next) => {
            const address = req.params.address;
            if (req.query.token === token) {
                universalAML.data({
                    dataType: 'entity', address: address, token: token, callback: data => {
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

module.exports = data;