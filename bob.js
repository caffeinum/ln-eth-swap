const web3 = require('./web3')
const lndInit = require('./lnd')
const fs = require('fs')
const Contract = require('./contract')

const RIPEMD160 = require('ripemd160')

const ripemd160 = (bytes) => new RIPEMD160().update(bytes).digest('hex')

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

	const hash = req.payment_hash

	// check ETH is locked
  console.log('check ETH is locked')

	const swap = new Contract()

	// check balance
	// const balance = await swap.getBalance()

	// check hash
	console.log('check hash')

	// hash == swap.secretHash.call()

	// send payment pay req
  console.log('send payment pay req')

	const pay = await lnd.sendPaymentSync({ payment_request: pay_req })

	console.log(pay)
	// obtain preimage
  console.log('obtain preimage')

	const secret = pay.payment_preimage.toString('hex')

	console.log(secret)
	console.log('hash', ripemd160(Buffer.from(secret, 'hex')))


	// withdraw ETH
  console.log('withdraw ETH')

	const receipt = await swap.withdraw(secret)
	
	console.log('receipt', receipt)
})
