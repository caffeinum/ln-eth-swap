const createLnrpc = require('lnrpc');

module.exports = (async function(url, macaroonPath) {
  const lnrpc = await createLnrpc({
    server: url || 'localhost:10001',
    macaroonPath,
  })

  // All requests are promisified
  const balance = await lnrpc.walletBalance({});

  // ...and you're off!
  return lnrpc
})
