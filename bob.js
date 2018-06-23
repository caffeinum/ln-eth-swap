const web3 = require('./web3')
const lndInit = require('./lnd')

const url = 'localhost:10002'

lndInit(url).then(async (lnd) => {

	console.log('')

	// get pay req
  console.log('get pay req')

	const invoice = await lnd.addInvoice({ amt: 10000 })

	// decode pay req
  console.log('decode pay req')

	console.log(invoice)
	
	// check ETH is locked
  console.log('check ETH is locked')

	// send payment pay req
  console.log('send payment pay req')

	// obtain preimage
  console.log('obtain preimage')

	// withdraw ETH
  console.log('withdraw ETH')

})
