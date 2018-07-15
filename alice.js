const web3 = require('./web3')
const lndInit = require('./lnd')
const fs = require('fs')
const Contract = require('./contract')

const wallet = require('./wallet')
wallet.init('0x8b8d2ec664a9b0a2553c414040fd626ba01d8adee7d826cfc124369cf4afe170')

const ALICE_ADDRESS = wallet.account.address
const BOB_ADDRESS = '0x49A463bE2b7aAefEc4a2f7356c477D1085dA25f3'

console.log('ALICE ADDRESS', ALICE_ADDRESS)

const SWAP_ETH_VALUE = '0.1'
const SWAP_BTC_VALUE = 10000

const sha256 = require('js-sha256')

const host = process.env.HOST || 'localhost'
const url = `${host}:10001`
const aliceMacaroon = './alice/admin.macaroon'

lndInit(url, aliceMacaroon).then(async (lnd) => {

	console.log('ALICE')

	// check balance
	const balance = await lnd.walletBalance({})

	console.log('check balance', balance)

	// create pay req
  console.log('create pay req')

	const invoice = await lnd.addInvoice({ value: SWAP_BTC_VALUE })

	console.log(invoice)

	// detailed invoice info
	console.log('get detailed')
	const r_hash = invoice.r_hash.toString('hex')
	const detailed = await lnd.lookupInvoice({ r_hash_str: r_hash })

	console.log(detailed)
	// extract preimage
	const preimage = detailed.r_preimage
  console.log('extract preimage')
	console.log(preimage.toString('hex'))

	// hash preimage
  console.log('hash preimage')
	const secret_bytes = preimage //Buffer.from(preimage, 'hex')

	const hash = sha256(secret_bytes)
	console.log(hash)

	// deploy ETH contract with preimage hash
  console.log('update ETH contract with preimage hash')

	const swap = new Contract()

	console.log('Alice waiting for confirmation...')
	const receipt = await swap.fund(BOB_ADDRESS, hash, SWAP_ETH_VALUE) // ETH

	console.log(receipt)

	console.log('send bob pay req')
	// send bob pay_req

	fs.writeFileSync("./pay_req", invoice.payment_request)

	console.log('pay req set:', fs.readFileSync("./pay_req").toString())

})
