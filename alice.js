const web3 = require('./web3')
const lndInit = require('./lnd')

const url = 'localhost:10001'

lndInit(url).then(async (lnd) => {

	console.log('ALICE')

	// check balance
	const balance = await lnd.walletBalance({})

	console.log('check balance', balance)

	// create pay req
  console.log('create pay req')

	const invoice = await lnd.addInvoice({ value: 10000 })

	// extract preimage
  console.log('extract preimage')
	console.log(invoice)

	// hash preimage
  console.log('hash preimage ')

	// deploy ETH contract with preimage hash
  console.log('deploy ETH contract with preimage hash')

})
