const web3 = require('./web3')
const lndInit = require('./lnd')

const sha256 = require('js-sha256')

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
	const preimage = invoice.r_hash
  console.log('extract preimage')
	console.log(preimage)

	// hash preimage
  console.log('hash preimage ')
	const hash = sha256(preimage)
	console.log(hash)

	// deploy ETH contract with preimage hash
  console.log('deploy ETH contract with preimage hash')

	fund(hash)

	// send bob pay_req

	process.env.PAY_REQ = invoice.payment_request

})

const fund = (hash, contract = '0xf7f9b7a594d56a428eca849db90227c7c6093e36') => {
	console.log('web3 blahblah')
}
