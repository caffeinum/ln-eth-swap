const web3 = require('./web3')
const abi = require('./abi')
const wallet = require('./wallet')

class Contract {
  constructor(contract = '0x8f468834bf4bbb98512e5bc1c6acb30f844973c7') {
    if (!wallet.account) throw new Error('init wallet')

    this.contract = new web3.eth.Contract(abi, contract, {
      from: wallet.account.address,
      gasPrice: '20000000000',
      gas: 1e5,
    })
  }

  async getBalance(recipient) {
    //{ _secretHash: hash }
    const receipt = await this.contract.methods.getBalance(recipient).call()
    return receipt
  }

  async fund(recipient, hash, value) {
    // hash is hex string
    hash = '0x' + hash
    // hash should be bytes20
    value = web3.utils.toWei(String(value))
    const receipt = this.contract.methods.deposit(recipient, hash).send({ value })
  		.on('transactionHash', (hash) => console.log('tx', hash))
    return receipt
  }

  async withdraw(creator, secret) {
    // secret is bytes32
    secret = '0x' + secret
    return this.contract.methods.withdraw(creator, secret).send()
  		.on('transactionHash', (hash) => console.log('tx', hash))
  		// .on('confirmation', (n, receipt) => ( n < 5 ) ? console.log('confirmed', n) : null)

  }
}

module.exports = Contract
