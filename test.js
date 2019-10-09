const UniversalAML = require('./universal-aml');

// this is where you put the public key and the provider
const scorechain = new UniversalAML({ publicKey: '123', AMLProvider: 'Scorechain' });

// this is the data for parameters
const data = {
    type: 'input',
    hash: 'somehash'
}

// in Scorechain provider we have many methods, this is an example for the scoring method
scorechain.scoring({scoringType: 'transaction', data: data, token: 'sometoken', callback: callback => {
    console.log(callback.body)
}})
