const web3 = require('./web3')
const abi = require('./abi')
const wallet = require('./wallet')

class Contract {
  constructor(contract = '0xf7f9b7a594d56a428eca849db90227c7c6093e36') {
    if (!wallet.account) throw new Error('init wallet')

    this.contract = new web3.eth.Contract(abi, contract, {
      from: wallet.account.address,
      gasPrice: '10000000000000',
      gas: 1000000
    })
  }

  async getBalance() {
    const receipt = await this.contract.methods.balance.call({ _secretHash: hash })
    return receipt
  }

  async fund(hash) {
    // hash is Buffer
    hash = new Uint8Array(hash).buffer
    // hash should be bytes20
    const receipt = await this.contract.methods.fund({ _secretHash: hash }).send()
    return receipt
  }

  async withdraw(secret) {
    // secret is bytes32
    const receipt = await this.contract.methods.withdraw({ _secret: secret }).send()
    return receipt
  }
}

module.exports = Contract
