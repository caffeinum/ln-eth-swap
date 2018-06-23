const web3 = require('./web3')

const wallet = {
  account: null,
  balance: null,
  tokens: [],
  init: function (priv) {
    if (!priv) throw new Error('no priv key');
    this.account = web3.eth.accounts.wallet.add(priv)
    this.getBalance()
  },
  getBalance: function () {
    let req = web3.eth.getBalance(this.account.address)
    req.then( (balance) => this.balance = balance )
    return req
  },
  send: function (dest, value) {

    let transaction = web3.eth.sendTransaction({
       from: this.account.address,
       to: dest,
       value: value, //this.balance - 1e10,
       gas: 1e5
    })

    console.log( transaction )
    if ( transaction ) {
       this.balance -= value
       updateBalance( this.balance )
    }
  }
}

wallet.init(process.env.PRIV)

module.exports = wallet
