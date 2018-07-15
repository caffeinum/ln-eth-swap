const web3 = require('./web3')
const lndInit = require('./lnd')
const fs = require('fs')
const Contract = require('./contract')

const wallet = require('./wallet')
wallet.init('0x79ac3fac7e8dbaeeb117d84e78815b9ce253bbb01a3daa6298d6a2aead8f0a6e')

const ALICE_ADDRESS = '0x15a38F422F81Fb90003323760E0A71f4DcA34255'
const BOB_ADDRESS = wallet.account.address

console.log('BOB ADDRESS', BOB_ADDRESS)

const sha256 = require('js-sha256')

const host = process.env.HOST || 'localhost'
const url = `${host}:10002`
const bobMacaroon = './bob/admin.macaroon'

const pay_req = fs.readFileSync('./pay_req').toString()

lndInit(url, bobMacaroon).then(async (lnd) => {

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
	console.log('hash', sha256(Buffer.from(secret, 'hex')))


	// withdraw ETH
  console.log('withdraw ETH waiting...')

	const receipt = await swap.withdraw(ALICE_ADDRESS, secret)

	console.log('receipt', receipt)
	console.log('tx hash ', receipt.transactionHash)
})
