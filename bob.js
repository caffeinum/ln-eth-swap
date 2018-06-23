const web3 = require('./web3')
const lndInit = require('./lnd')
const fs = require('fs')

const url = 'localhost:10002'

const pay_req = fs.readFileSync('./pay_req').toString()

lndInit(url).then(async (lnd) => {

	console.log('BOB')

	// get pay req
  console.log('get pay req')

	console.log(pay_req)

	// decode pay req
  console.log('decode pay req')

	const req = await lnd.decodePayReq({ pay_req })

	console.log('req', req)
	// check ETH is locked
  console.log('check ETH is locked')

	// send payment pay req
  console.log('send payment pay req')

	// obtain preimage
  console.log('obtain preimage')

	// withdraw ETH
  console.log('withdraw ETH')

})
