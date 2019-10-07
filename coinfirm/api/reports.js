const express = require('express');
const bodyParser = require('body-parser');
const UniversalAML = require('../../universal-aml');

const reports = express();
reports.use(bodyParser.urlencoded({ extended: false }));
reports.use(bodyParser.json());

var bearerToken = 'testToken';

reports.get('/aml/basic/:address', (req, res, next) => {
    const universalAML = new UniversalAML({ AMLProvider: 'Coinfirm' });
    if (!req.headers.authorization ||
        !req.headers["content-type"] ||
        req.headers.authorization.split(' ')[1] !== bearerToken) {
        res.status(403).json({ error: 'No credentials sent!' });
    } else {
        const data = {
            address: req.params.address,
            v: req.query.v,
            query: req._parsedUrl.search
        }
        universalAML.reports({
            reportType: 'createBasicReport', data: data, callback: callback => {
                res.send(callback)
            }
        })
    }
})

reports.get('/aml/standard/:address', (req, res, next) => {
    const universalAML = new UniversalAML({ AMLProvider: 'Coinfirm' });
    if (!req.headers.authorization ||
        !req.headers["content-type"] ||
        req.headers.authorization.split(' ')[1] !== bearerToken) {
        res.status(403).json({ error: 'No credentials sent!' });
    } else {
        const data = {
            address: req.params.address,
            include_indicators: req.query.include_indicators,
            v: req.query.v,
            query: req._parsedUrl.search
        }
        universalAML.reports({
            reportType: 'createStandardReport', data: data, callback: callback => {
                res.send(callback)
            }
        })
    }
})

module.exports = reports;