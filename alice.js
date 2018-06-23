const web3 = require('./web3')
const lndInit = require('./lnd')
const fs = require('fs')
const Contract = require('./contract')

const RIPEMD160 = require('ripemd160')

const ripemd160 = (bytes) => new RIPEMD160().update(bytes).digest('hex')
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

	console.log(invoice)

	// detailed invoice info
	console.log('get detailed')
	const r_hash = invoice.r_hash
	const detailed = await lnd.lookupInvoice({ r_hash_str: r_hash })

	console.log(detailed)
	// extract preimage
	const preimage = detailed.payment_preimage
  console.log('extract preimage')
	console.log(preimage)

	// hash preimage
  console.log('hash preimage')
	const secret_bytes = Buffer.from(preimage, 'hex')

	const hash = ripemd160(secret_bytes)
	console.log(hash)

	// deploy ETH contract with preimage hash
  console.log('update ETH contract with preimage hash')

	const swap = new Contract()
	swap.fund(hash, '0.1') // ETH

	console.log('send bob pay req')
	// send bob pay_req

	fs.writeFileSync("./pay_req", invoice.payment_request)
	// process.env['PAY_REQ'] = invoice.payment_request

	console.log('pay req set:', fs.readFileSync("./pay_req").toString())

})
