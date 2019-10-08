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

reports.get('/aml/full/:address', (req, res, next) => {
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
            reportType: 'createFullReport', data: data, callback: callback => {
                res.send(callback)
            }
        })
    }
})

reports.get('/aml/enhanced/:address', (req, res, next) => {
    const universalAML = new UniversalAML({ AMLProvider: 'Coinfirm' });
    if (!req.headers.authorization ||
        !req.headers["content-type"] ||
        req.headers.authorization.split(' ')[1] !== bearerToken) {
        res.status(403).json({ error: 'No credentials sent!' });
    } else {
        const data = {
            address: req.params.address,
            include_indicators: req.query.include_indicators,
            include_descriptions: req.query.include_descriptions,
            transaction_data: req.query.transaction_data,
            v: req.query.v,
            query: req._parsedUrl.search
        }
        universalAML.reports({
            reportType: 'createEnhancedReport', data: data, callback: callback => {
                res.send(callback)
            }
        })
    }
})

reports.get('/aml/:report_id', (req, res, next) => {
    const universalAML = new UniversalAML({ AMLProvider: 'Coinfirm' });
    if (!req.headers.authorization ||
        !req.headers["content-type"] ||
        req.headers.authorization.split(' ')[1] !== bearerToken) {
        res.status(403).json({ error: 'No credentials sent!' });
    } else {
        const data = {
            report_id: req.params.report_id,
            include_indicators: req.query.include_indicators,
            include_descriptions: req.query.include_descriptions,
            query: req._parsedUrl.search
        }
        universalAML.reports({
            reportType: 'getReport', data: data, callback: callback => {
                res.send(callback)
            }
        })
    }
})

reports.get('/aml/:report_id/pdf', (req, res, next) => {
    const universalAML = new UniversalAML({ AMLProvider: 'Coinfirm' });
    if (!req.headers.authorization ||
        !req.headers["content-type"] ||
        req.headers.authorization.split(' ')[1] !== bearerToken) {
        res.status(403).json({ error: 'No credentials sent!' });
    } else {
        const data = {
            report_id: req.params.report_id,
            include_indicators: req.query.include_indicators,
            include_descriptions: req.query.include_descriptions,
            transaction_data: req.query.transaction_data,
            query: req._parsedUrl.search
        }
        universalAML.reports({
            reportType: 'getPDFReport', data: data, callback: callback => {
                res.send(callback)
            }
        })
    }
})

reports.get('/aml/:report_id/base64', (req, res, next) => {
    const universalAML = new UniversalAML({ AMLProvider: 'Coinfirm' });
    if (!req.headers.authorization ||
        !req.headers["content-type"] ||
        req.headers.authorization.split(' ')[1] !== bearerToken) {
        res.status(403).json({ error: 'No credentials sent!' });
    } else {
        const data = {
            report_id: req.params.report_id,
        }
        universalAML.reports({
            reportType: 'getBase64Report', data: data, callback: callback => {
                res.send(callback)
            }
        })
    }
})

reports.get('/financial/:address', (req, res, next) => {
    const universalAML = new UniversalAML({ AMLProvider: 'Coinfirm' });
    if (!req.headers.authorization ||
        !req.headers["content-type"] ||
        req.headers.authorization.split(' ')[1] !== bearerToken) {
        res.status(403).json({ error: 'No credentials sent!' });
    } else {
        const data = {
            address: req.params.address,
            period_type: req.query.period_type,
            start: req.query.start,
            end: req.query.end,
            step: req.query.step,
            currency: req.query.currency,
            query: req._parsedUrl.search
        }
        universalAML.reports({
            reportType: 'getFinancialReport', data: data, callback: callback => {
                res.send(callback)
            }
        })
    }
})

reports.get('/aml/transaction-history/:report_id', (req, res, next) => {
    const universalAML = new UniversalAML({ AMLProvider: 'Coinfirm' });
    if (!req.headers.authorization ||
        !req.headers["content-type"] ||
        req.headers.authorization.split(' ')[1] !== bearerToken) {
        res.status(403).json({ error: 'No credentials sent!' });
    } else {
        const data = {
            report_id: req.params.report_id,
            start: req.query.start,
            end: req.query.end,
            step: req.query.step,
            query: req._parsedUrl.search
        }
        universalAML.reports({
            reportType: 'getTransactionForAddress', data: data, callback: callback => {
                res.send(callback)
            }
        })
    }
})

reports.get('/aml/transaction-history/:report_id/:token_name', (req, res, next) => {
    const universalAML = new UniversalAML({ AMLProvider: 'Coinfirm' });
    if (!req.headers.authorization ||
        !req.headers["content-type"] ||
        req.headers.authorization.split(' ')[1] !== bearerToken) {
        res.status(403).json({ error: 'No credentials sent!' });
    } else {
        const data = {
            report_id: req.params.report_id,
            token_name: req.params.token_name,
            start: req.query.start,
            end: req.query.end,
            step: req.query.step,
            chart_type: req.query.chart_type,
            query: req._parsedUrl.search
        }
        universalAML.reports({
            reportType: 'getTransactionForToken', data: data, callback: callback => {
                res.send(callback)
            }
        })
    }
})

reports.get('/aml/indicators/:report_id', (req, res, next) => {
    const universalAML = new UniversalAML({ AMLProvider: 'Coinfirm' });
    if (!req.headers.authorization ||
        !req.headers["content-type"] ||
        req.headers.authorization.split(' ')[1] !== bearerToken) {
        res.status(403).json({ error: 'No credentials sent!' });
    } else {
        const data = {
            report_id: req.params.report_id,
            include_descriptions: req.params.include_descriptions,
            query: req._parsedUrl.search
        }
        universalAML.reports({
            reportType: 'getIndicators', data: data, callback: callback => {
                res.send(callback)
            }
        })
    }
})

module.exports = reports;