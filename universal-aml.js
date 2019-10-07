const http = require('http');
const https = require('https');
const _ = require('lodash');
const request = require('request');
const Bitcoin = require('./scorechain/coins/bitcoin');
const Ethereum = require('./scorechain/coins/ethereum');

const bitcoin = new Bitcoin();
const ethereum = new Ethereum();

var UniversalAML = function ({ publicKey, AMLProvider }) {
  this.publicKey = publicKey;
  this.AMLProvider = AMLProvider;
}

UniversalAML.prototype.scoring = function ({ scoringType, data, token, callback }) {
  switch (this.AMLProvider) {
    case 'Scorechain': {
      if (this.publicKey === bitcoin.publicKey) {
        bitcoin.url = 'https://bitcoin.scorechain.com/api';
        bitcoin.scoring({ scoringType, data: data, token: token, callback })
      } else if (this.publicKey === ethereum.publicKey) {
        ethereum.url = 'https://api.ethereum.scorechain.com/';
        ethereum.scoring({ scoringType, address: address, direction: direction, tokenAddress: tokenAddress, hash: hash, token: token, callback });
      }
      break;
    }
  }
}

UniversalAML.prototype.reports = function ({ reportMethod, reportType, data, token, callback }) {
  switch (this.AMLProvider) {
    case 'Scorechain': {
      if (this.publicKey === bitcoin.publicKey) {
        bitcoin.url = 'https://bitcoin.scorechain.com/api';
        bitcoin.reports({ reportMethod, data: data, token: token, callback })
      }
      break;
    }

    case 'Coinfirm': {
      switch (reportType) {
        case 'createBasicReport': {
          const address = data.address;
          const query = data.query ? `${data.query}` : '';
          request.get(`https://api.coinfirm.com/v3/reports/aml/basic/${address}${query}`, (error, response, body) => {
            if (error) {
              callback(error)
            } else {
              callback(response)
            }
          })
          break;
        }

        case 'createStandardReport': {
          const address = data.address;
          const query = data.query ? `${data.query}` : '';
          request.get(`https://api.coinfirm.com/v3/reports/aml/standard/${address}${query}`, (error, response, body) => {
            if (error) {
              callback(error)
            } else {
              callback(response)
            }
          })
          break;
        }
      }
    }
  }
}

UniversalAML.prototype.data = function ({ dataType, data, token, callback }) {
  switch (this.AMLProvider) {
    case 'Scorechain': {
      if (this.publicKey === bitcoin.publicKey) {
        bitcoin.url = 'https://bitcoin.scorechain.com/api';
        bitcoin.data({ dataType, data: data, token: token, callback })
      }
      break;
    }
  }
}

UniversalAML.prototype.customisation = function ({ token, callback }) {
  switch (this.AMLProvider) {
    case 'Scorechain': {
      if (this.publicKey === bitcoin.publicKey) {
        bitcoin.url = 'https://bitcoin.scorechain.com/api';
        bitcoin.customisation({ token, callback });
      }
      break;
    }
  }
}

UniversalAML.prototype.alerts = function ({ alertMethod, data, token, callback }) {
  switch (this.AMLProvider) {
    case 'Scorechain': {
      if (this.publicKey === bitcoin.publicKey) {
        bitcoin.url = 'https://bitcoin.scorechain.com/api';
        bitcoin.alerts({ alertMethod, data: data, token: token, callback })
      }
      break;
    }
  }
}

module.exports = UniversalAML;