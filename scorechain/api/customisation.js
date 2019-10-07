const express = require('express');
const bodyParser = require('body-parser');
const Bitcoin = require('../coins/bitcoin');
const UniversalAML = require('../../universal-aml');
const bitcoin = new Bitcoin();

const customisation = express();
customisation.use(bodyParser.urlencoded({ extended: false }));
customisation.use(bodyParser.json());

var token = 'testToken'; // authorization token
var coin = '';

const getCoin = (req, res, next) => {
    const publicKey = req.params.publicKey;
    (publicKey === bitcoin.publicKey) ? coin = 'bitcoin' : coin = 'ethereum';
    res.send({ coin: coin });
    next();
}

customisation.get('/coin/:publicKey', getCoin, (req, res, next) => {
    const universalAML = new UniversalAML({publicKey: req.params.publicKey, AMLProvider: 'Scorechain'});
    if (coin === 'bitcoin') {
        // http://localhost:8080/api/scorechain/data/status?token={token}
        customisation.get('/scx', (req, res, next) => {
            if (req.query.token === token) {
                universalAML.customisation({
                    token: token, callback: callback => {
                        res.send(callback)
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

module.exports = customisation;