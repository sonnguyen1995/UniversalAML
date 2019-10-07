const request = require('request');

var Bitcoin = function (url) {
  this.publicKey = '123';
  this.url = url;
}

Bitcoin.prototype.scoring = function ({ scoringType, data, token, callback }) {
  switch (scoringType) {
    case 'transaction': {
      const type = data.type;
      const hash = data.hash;
      request.get(`${this.url}/scoring/transaction/${type}/${hash}?token=${token}`, (error, response, body) => {
        if (error) {
          callback(error)
        }
        else {
          callback(response)
        }
      });
      break;
    }

    case 'address': {
      const type = data.type;
      const address = data.type;
      request.get(`${this.url}/scoring/address/${type}/${address}?token=${token}`, (error, response, body) => {
        if (error) {
          callback(error)
        }
        else {
          callback(response)
        }
      });
      break;
    }

    case 'entity': {
      const type = data.type;
      const address = data.address;
      request.get(`${this.url}/scoring/entity/${type}/${address}?token=${token}`, (error, response, body) => {
        if (error) {
          callback(error)
        }
        else {
          callback(response)
        }
      });
      break;
    }

    case 'utxos': {
      const type = data.type;
      const body = {
        'txid': data.txid,
        'vout': data.vout
      }
      request.post(`${this.url}/scoring/utxos/${type}?token=${token}`, { form: body }, (error, response, body) => {
        if (error) {
          callback(error)
        }
        else {
          callback(response)
        }
      });
      break;
    }

    default: 0
  }
}

Bitcoin.prototype.reports = function ({ reportMethod, data, token, callback }) {
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
      request.post(`${this.url}/report?token=${token}`, { form: data }, (error, response, body) => {
        if (error) {
          callback(error)
        }
        else {
          callback(response)
        }
      })
      break;

    case 'DELETE':
      request.delete(`${this.url}/report?token=${token}`, { form: data }, (error, response, body) => {
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

Bitcoin.prototype.data = function ({ dataType, data, token, callback }) {
  switch (dataType) {
    case 'status': {
      request.get(`${this.url}/status?token=${token}`, (error, response, body) => {
        if (error) {
          callback(error)
        }
        else {
          callback(response)
        }
      })
      break;
    }

    case 'transaction': {
      const hash = data.hash;
      request.get(`${this.url}/tx/${hash}?token=${token}`, (error, response, body) => {
        if (error) {
          callback(error)
        }
        else {
          callback(response)
        }
      })
      break;
    }

    case 'address': {
      const address = data.address;
      request.get(`${this.url}/address/${address}?token=${token}`, (error, response, body) => {
        if (error) {
          callback(error)
        }
        else {
          callback(response)
        }
      })
      break;
    }

    case 'entity': {
      const address = data.address;
      request.get(`${this.url}/entity/${address}?token=${token}`, (error, response, body) => {
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
}

Bitcoin.prototype.customisation = function ({ token, callback }) {
  request.get(`${this.url}/scx?token=${token}`, (error, response, body) => {
    if (error) {
      callback(error)
    }
    else {
      callback(response)
    }
  })
}

Bitcoin.prototype.alerts = function ({ alertMethod, data, token, callback }) {
  switch (alertMethod) {
    case 'GET':
      request.get(`${this.url}/alerts?token=${token}`, (error, response, body) => {
        if (error) {
          callback(error)
        }
        else {
          callback(response)
        }
      })
      break;

    case 'POST':
      request.post(`${this.url}/alerts?token=${token}`, { form: data }, (error, response, body) => {
        if (error) {
          callback(error)
        }
        else {
          callback(response)
        }
      })
      break;

    case 'DELETE':
      request.delete(`${this.url}/alerts?token=${token}`, { form: data }, (error, response, body) => {
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