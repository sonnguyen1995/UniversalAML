const http = require('http');
const https = require('https');
const _ = require('lodash');
const Bitcoin = require('./bitcoin-api');
const Ethereum = require('./ethereum-api');

const bitcoin = new Bitcoin();
const ethereum = new Ethereum();

var UniversalAML = function (publicKey, AMLProvider) {
  this.publicKey = publicKey;
  this.AMLProvider = AMLProvider;
}

UniversalAML.prototype.scoring = function ({
  scoringType,
  type,
  hash = '',
  address = '',
  tokenAddress = '',
  direction = '',
  txid = '',
  vout = '',
  callback }) {
  switch (this.AMLProvider) {
    case 'Scorechain': {
      if (this.publicKey === bitcoin.publicKey) {
        bitcoin.url = 'https://bitcoin.scorechain.com/api';
        bitcoin.scoring({ scoringType, type, hash: hash, address: address, txid: txid, vout: vout, callback })
      } else if (this.publicKey === ethereum.publicKey) {
        ethereum.url = 'https://api.ethereum.scorechain.com/';
        ethereum.scoring({ scoringType, address: address, direction: direction, tokenAddress: tokenAddress, hash: hash, callback });
      }
      break;
    }
  }
}

UniversalAML.prototype.reports = function (reportMethod, callback) {
  switch (this.AMLProvider) {
    case 'Scorechain': {
      if (this.publicKey === bitcoin.publicKey) {
        bitcoin.url = 'https://bitcoin.scorechain.com/api';
        bitcoin.reports(reportMethod, callback)
      }
      break;
    }
  }
}

module.exports = UniversalAML;