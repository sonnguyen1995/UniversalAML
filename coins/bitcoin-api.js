const request = require('request');

var Bitcoin = function (url) {
  this.publicKey = '123';
  this.url = url;
}

Bitcoin.prototype.scoring = function ({ scoringType, type, hash, address, txid, vout, token, callback }) {
  switch (scoringType) {
    case 'transaction':
      request.get(`${this.url}/scoring/transaction/${type}/${hash}?token=${token}`, (error, response, body) => {
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
      request.get(`${this.url}/scoring/address/${type}/${hash}?token=${token}`, (error, response, body) => {
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
      request.get(`${this.url}/scoring/entity/${type}/${hash}?token=${token}`, (error, response, body) => {
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
      request.post(`${this.url}/scoring/utxos/${type}?token=${token}`, { form: { txid: txid, vout: vout } }, (error, response, body) => {
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

Bitcoin.prototype.reports = function ({ reportMethod, body, token, callback }) {
  switch (reportMethod) {
    case 'GET':
      request.get(`${this.url}/report?token=${token}`, (error, response, body) => {
        if (error) {
          callback(error)
        }
        else {
          callback(response)
        }
      });
      break;
    case 'POST':
      request.post(`${this.url}/report?token=${token}`, { form: body }, (error, response, body) => {
        if (error) {
          callback(error)
        }
        else {
          callback(response)
        }
      })
      break;
  }
}

module.exports = Bitcoin;