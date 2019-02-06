import Web3 from 'web3'
import { Provider } from 'web3/providers'

export default class Signer {
  private web3: Web3;
  constructor (provider: Provider) {
    this.web3 = new Web3(provider)
  }

  public get provider () {
    return this.web3.givenProvider
  }

  public async connect (): Promise<string[]> {
    // TODO: use provider.send('eth_requestAccounts') or eth.requestAccounts()
    // maybe broken...
    const accounts = await this.provider.enable()
    return accounts
  }

  public async sign (message: string): Promise<string> {
    const accounts = await this.connect()
    const sign = await this.web3.eth.sign(message, accounts[0])
    return sign
  }
}
