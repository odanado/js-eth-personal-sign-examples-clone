import Web3 from 'web3'
import { Provider, JsonRPCResponse } from 'web3/providers'
import { TypedData as TypedDataV3 } from '@uniqys/tx-proxy-lib'

export type Account = string;
export type Hash = string;
export type Signature = string;
export type Address = string;

export interface TypedData {
  type: string;
  name: string;
  value: string;
}

export namespace TypedMyData {

  export interface MyData {
    message: string,
    amount: number
  }

  export const types: TypedDataV3.Types = {
    EIP712Domain: [
      { name: 'verifyingContract', type: 'address' }
    ],
    MyData: [
      { name: 'message', type: 'string' },
      { name: 'amount', type: 'uint32' }
    ]
  }

  /* eslint no-inner-declarations: 0 */
  export function make (verifyingContract: Address, data: MyData): TypedDataV3<MyData> {
    return {
      types: types,
      primaryType: 'MyData',
      domain: { verifyingContract },
      message: data
    }
  }
}

export default class Signer {
  private web3: Web3;
  constructor (provider: Provider) {
    this.web3 = new Web3(provider)
  }

  // EIP-1193 compatibility
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
    return this.web3.currentProvider
  }

  public async connect (): Promise<Account[]> {
    // TODO: use provider.send('eth_requestAccounts') or eth.requestAccounts()
    // maybe broken...
    if (!this.provider.enable) {
      return []
    }
    const accounts = await this.provider.enable()
    return accounts
  }

  public async sign (message: Hash): Promise<Signature> {
    const account = await this.address()
    const sign = await this.web3.eth.sign(message, account)
    return sign
  }

  public async personalSign (message: string): Promise<string> {
    const account = await this.address()
    const result = await this.send('personal_sign', [message, account])
    return result.result
  }

  public async personalECRecover (message: string, signature: Signature): Promise<Account> {
    const result = await this.send('personal_ecRecover', [message, signature])
    return result.result
  }

  public async signTypedData (params: TypedData[]): Promise<Signature> {
    const account = await this.address()
    const result = await this.send('eth_signTypedData', [params, account])
    return result.result
  }

  public async signTypedDataV3 (verifyingContract: Address, data: TypedMyData.MyData): Promise<Signature> {
    const account = await this.address()
    const params = TypedMyData.make(verifyingContract, data)
    console.log(params)
    const result = await this.send('eth_signTypedData_v3', [account, JSON.stringify(params)])
    return result.result
  }

  public hash (message: string): Hash {
    return this.web3.utils.sha3(message)
  }

  public async address (): Promise<Account> {
    const accounts = await this.web3.eth.getAccounts()
    return accounts[0]
  }
}
