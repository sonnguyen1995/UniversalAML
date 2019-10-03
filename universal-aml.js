const http = require('http');
const https = require('https');
const _ = require('lodash');
const Bitcoin = require('./scorechain/coins/bitcoin');
const Ethereum = require('./scorechain/coins/ethereum');

const bitcoin = new Bitcoin();
const ethereum = new Ethereum();

var UniversalAML = function (publicKey, AMLProvider) {
  this.publicKey = publicKey;
  this.AMLProvider = AMLProvider;
}

UniversalAML.prototype.scoring = function ({ scoringType, type, hash, address, tokenAddress, direction, txid, vout, token, callback }) {
  switch (this.AMLProvider) {
    case 'Scorechain': {
      if (this.publicKey === bitcoin.publicKey) {
        bitcoin.url = 'https://bitcoin.scorechain.com/api';
        bitcoin.scoring({ scoringType, type, hash: hash, address: address, txid: txid, vout: vout, token: token, callback })
      } else if (this.publicKey === ethereum.publicKey) {
        ethereum.url = 'https://api.ethereum.scorechain.com/';
        ethereum.scoring({ scoringType, address: address, direction: direction, tokenAddress: tokenAddress, hash: hash, token: token, callback });
      }
      break;
    }
  }
}

UniversalAML.prototype.reports = function ({ reportMethod, body, token, callback }) {
  switch (this.AMLProvider) {
    case 'Scorechain': {
      if (this.publicKey === bitcoin.publicKey) {
        bitcoin.url = 'https://bitcoin.scorechain.com/api';
        bitcoin.reports({ reportMethod, body: body, token: token, callback })
      }
      break;
    }
  }
}

UniversalAML.prototype.data = function ({ dataType, hash, address, token, callback }) {
  switch (this.AMLProvider) {
    case 'Scorechain': {
      if (this.publicKey === bitcoin.publicKey) {
        bitcoin.url = 'https://bitcoin.scorechain.com/api';
        bitcoin.data({ dataType, hash: hash, address: address, token: token, callback })
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

UniversalAML.prototype.alerts = function ({ alertMethod, body, token, callback }) {
  switch (this.AMLProvider) {
    case 'Scorechain': {
      if (this.publicKey === bitcoin.publicKey) {
        bitcoin.url = 'https://bitcoin.scorechain.com/api';
        bitcoin.alerts({ alertMethod, body: body, token: token, callback })
      }
      break;
    }
  }
}

module.exports = UniversalAML;