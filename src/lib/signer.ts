import Web3 from 'web3'
import { Provider, JsonRPCResponse } from 'web3/providers'

export type Account = string;
export type Hash = string;
export type Signature = string;

export interface TypedData {
  type: string;
  name: string;
  value: string;
}

export default class Signer {
  private web3: Web3;
  constructor (provider: Provider) {
    this.web3 = new Web3(provider)
  }

  private send (method: string, params: any[]): Promise<JsonRPCResponse> {
    return new Promise<JsonRPCResponse>((resolve, reject) => {
      this.provider.send({
        method,
        params,
        id: 0,
        jsonrpc: '2.0'
      }, (error: (null | Error), val?: JsonRPCResponse) => {
        if (error) {
          reject(error)
          return
        }
        if (!val) {
          reject(new Error())
          return
        }
        if (val.error) {
          reject(val.error)
        }
        resolve(val)
      })
    })
  }

  public get provider () {
    return this.web3.givenProvider
  }

  public async connect (): Promise<Account[]> {
    // TODO: use provider.send('eth_requestAccounts') or eth.requestAccounts()
    // maybe broken...
    const accounts = await this.provider.enable()
    return accounts
  }

  public async sign (message: Hash): Promise<Signature> {
    const accounts = await this.connect()
    const sign = await this.web3.eth.sign(message, accounts[0])
    return sign
  }

  public async personalSign (message: string): Promise<string> {
    const accounts = await this.connect()
    const result = await this.send('personal_sign', [message, accounts[0]])
    return result.result
  }

  public async personalECRecover (message: string, signature: Signature): Promise<Account> {
    const result = await this.send('personal_ecRecover', [message, signature])
    return result.result
  }

  public async signTypedData (params: TypedData[]): Promise<Signature> {
    const accounts = await this.connect()
    const result = await this.send('eth_signTypedData', [params, accounts[0]])
    return result.result
  }
}
