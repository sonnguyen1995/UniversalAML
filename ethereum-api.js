const request = require('request');

var Ethereum = function (url) {
  this.publicKey = '321';
  this.url = url;
}

Ethereum.prototype.scoring = function ({
  scoringType,
  address = '',
  tokenAddress = '',
  hash = '',
  direction = '',
  callback }) {
  switch (scoringType) {
    case 'address':
      if (address && !tokenAddress) {
        request.get(`${this.url}/scoring/address/${address}/${direction}`, (error, response, body) => {
          if (error) {
            callback(error)
          }
          else {
            callback(response.body)
          }
        });
      } else if (address && tokenAddress) {
        request.get(`${this.url}/scoring/address/${address}/token/${tokenAddress}/${direction}`, (error, response, body) => {
          if (error) {
            callback(error)
          }
          else {
            callback(response.body)
          }
        });
      } else {
        callback({ error: 'Wrong endpoint format' })
      }
      break;
    case 'transaction':
      if (hash && !tokenAddress) {
        request.get(`${this.url}/scoring/transaction/${hash}/${direction}`, (error, response, body) => {
          if (error) {
            callback(error)
          }
          else {
            callback('hash no token')
          }
        });
      } else if (hash && tokenAddress) {
        request.get(`${this.url}/scoring/transaction/${hash}/token/${tokenAddress}/${direction}`, (error, response, body) => {
          if (error) {
            callback(error)
          }
          else {
            callback('hash with token')
          }
        });
      } else {
        callback({ error: 'Wrong endpoint format' })
      }
      break;
    default: 0
  }
}

module.exports = Ethereum;