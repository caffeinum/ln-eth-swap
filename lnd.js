const createLnrpc = require('lnrpc');

module.exports = (async function(url) {
  const lnrpc = await createLnrpc({
    server: url || 'localhost:10001',
  })
  // All requests are promisified
  const balance = await lnrpc.walletBalance({});

  // ...and you're off!
  console.log(balance);
  return lnrpc
})


