const web3 = require('./web3')
const abi = require('./abi')
const wallet = require('./wallet')

class Contract {
  constructor(contract = '0xf7f9b7a594d56a428eca849db90227c7c6093e36') {
    if (!wallet.account) throw new Error('init wallet')

    this.contract = new web3.eth.Contract(abi, contract, {
      from: wallet.account.address,
      gasPrice: '20000000000',
      gas: 1e5,
    })
  }

  async getBalance() {
    const receipt = await this.contract.methods.balance.call({ _secretHash: hash })
    return receipt
  }

  async fund(hash, value) {
    // hash is hex string
    hash = '0x' + hash
    // hash should be bytes20
    const receipt = await this.contract.methods.fund(hash).send({
      value: web3.utils.toWei(value)
    })
    return receipt
  }

  async withdraw(secret) {
    // secret is bytes32
    secret = '0x' + secret
    return this.contract.methods.withdraw(secret)
  }
}

module.exports = Contract
