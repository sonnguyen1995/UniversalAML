const request = require('request');

var Bitcoin = function (url) {
  this.publicKey = '123';
  this.url = url;
}

Bitcoin.prototype.scoring = function ({
  scoringType,
  type,
  hash = '',
  address = '',
  txid = '',
  vout = '',
  callback }) {
  switch (scoringType) {
    case 'transaction':
      request.get(`${this.url}/scoring/transaction/${type}/${hash}`, (error, response, body) => {
        if (hash) {
          if (error) {
            callback(error)
          }
          else {
            callback(response)
          }
        } else {
          callback({ error: 'Wrong endpoint format' })
        }
      });
      break;
    case 'address':
      request.get(`${this.url}/scoring/address/${type}/${hash}`, (error, response, body) => {
        if (address) {
          if (error) {
            callback(error)
          }
          else {
            callback(response)
          }
        } else {
          callback({ error: 'Wrong endpoint format' })
        }
      });
      break;
    case 'entity':
      request.get(`${this.url}/scoring/entity/${type}/${hash}`, (error, response, body) => {
        if (address) {
          if (error) {
            callback(error)
          }
          else {
            callback(response)
          }
        } else {
          callback({ error: 'Wrong endpoint format' })
        }
      });
      break;
    case 'utxos':
      request.post(`${this.url}/scoring/utxos/${type}`, { form: { txid: txid, vout: vout } }, (error, response, body) => {
        if (error) {
          callback(error)
        }
        else {
          callback(response)
        }
      });
      break;
    default: 0
  }
}

Bitcoin.prototype.reports = function (reportMethod, callback) {
  switch (reportMethod) {
    case 'GET':
      request.get(`${this.url}/report`, (error, response, body) => {
        if (error) {
          callback(error)
        }
        else {
          callback(response)
        }
      })
  }
}

module.exports = Bitcoin;