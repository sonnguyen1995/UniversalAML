const express = require('express');
const bodyParser = require('body-parser');
const Bitcoin = require('../coins/bitcoin');
const UniversalAML = require('../../universal-aml');
const bitcoin = new Bitcoin();

const scoring = express();
scoring.use(bodyParser.urlencoded({ extended: false }));
scoring.use(bodyParser.json());

var token = 'testToken'; // authorization token
var coin = '';

const getCoin = (req, res, next) => {
    const publicKey = req.params.publicKey;
    (publicKey === bitcoin.publicKey) ? coin = 'bitcoin' : coin = 'ethereum';
    res.send({ coin: coin });
    next();
}

// http://localhost:8080/api/scorechain/scoring/coin/{publicKey}
scoring.get('/coin/:publicKey', getCoin, (req, res, next) => {
    const universalAML = new UniversalAML(req.params.publicKey, 'Scorechain');
    if (coin === 'bitcoin') {
        // http://localhost:8080/api/scorechain/scoring/transaction/{type}/{hash}?token={token}
        scoring.get(`/transaction/:type/:hash`, (req, res, next) => {
            const type = req.params.type;
            const hash = req.params.hash;
            if (req.query.token === token) {
                universalAML.scoring({
                    scoringType: 'transaction', type: type, hash: hash, token: token, callback: data => {
                        res.send(data)
                    }
                })
            } else {
                res.send({ "error": "invalid token" })
            }
        })
        // http://localhost:8080/api/scorechain/scoring/address/{type}/{address}?token={token}
        scoring.get(`/address/:type/:address`, (req, res, next) => {
            const type = req.params.type;
            const address = req.params.address;
            if (req.query.token === token) {
                universalAML.scoring({
                    scoringType: 'address', type: type, address: address, token: token, callback: data => {
                        res.send(data)
                    }
                })
            } else {
                res.send({ "error": "invalid token" })
            }
        })
        // http://localhost:8080/api/scorechain/scoring/entity/{type}/{address}?token={token}
        scoring.get(`/entity/:type/:address`, (req, res, next) => {
            const type = req.params.type;
            const address = req.params.address;
            if (req.query.token === token) {
                universalAML.scoring({
                    scoringType: 'entity', type: type, address: address, token: token, callback: data => {
                        res.send(data)
                    }
                })
            } else {
                res.send({ "error": "invalid token" })
            }
        })
        // http://localhost:8080/api/scorechain/scoring/utxos/{type}?token={token}
        scoring.post(`/utxos/:type`, (req, res, next) => {
            const type = req.params.type;
            const body = {
                txid: req.body.txid,
                vout: req.body.vout,
            }
            if (req.query.token === token) {
                universalAML.scoring({
                    scoringType: 'utxos', type: type, body: body, token: token, callback: data => {
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


module.exports = scoring;