import Web3 from 'web3'
import { Eth } from 'web3-eth'
import { provider, EthereumProvider } from 'web3-providers'

export default class Signer {
  private web3: Web3;
  constructor (provider: provider) {
    this.web3 = new Web3(provider)
  }

  public get provider (): EthereumProvider {
    // XXXX
    return this.web3.givenProvider as EthereumProvider
  }

  public async connect (): Promise<string[]> {
    // TODO: use provider.send('eth_requestAccounts') or eth.requestAccounts()
    // maybe broken...
    const accounts = await this.provider.enable()
    return accounts
  }
}
