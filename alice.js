const web3 = require('./web3')
const lndInit = require('./lnd')

const url = 'localhost:10001'

lndInit(url).then(async (lnd) => {

	console.log('')

	// create pay req
  console.log('create pay req')

	// extract preimage
  console.log('extract preimage')

	// hash preimage
  console.log('hash preimage ')

	// deploy ETH contract with preimage hash
  console.log('deploy ETH contract with preimage hash')

})
