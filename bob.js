const web3 = require('./web3')
const lndInit = require('./lnd')

const url = 'localhost:10002'

lndInit(url).then(async (lnd) => {

	console.log('BOB')

	// get pay req
  console.log('get pay req')

	const call = lnd.subscribeInvoices({})
	call.on('data', function(invoice) {
	    console.log(invoice);
	})
	.on('end', function() {
	  // The server has finished sending
	})
	.on('status', function(status) {
	  // Process status
	  console.log("Current status" + status)
	});


	// decode pay req
  console.log('decode pay req')


	// check ETH is locked
  console.log('check ETH is locked')

	// send payment pay req
  console.log('send payment pay req')

	// obtain preimage
  console.log('obtain preimage')

	// withdraw ETH
  console.log('withdraw ETH')

})
