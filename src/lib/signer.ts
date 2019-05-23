import { AbstractWeb3Module } from 'web3-core'
import { provider } from 'web3-providers'
import { AbstractMethod } from 'web3-core-method'
import * as Utils from 'web3-utils'
import { formatters } from 'web3-core-helpers'

import { Address, Hash, Signature } from './types'
import { TypedMyData } from './typed-my-data'

export interface TypedData {
  type: string;
  name: string;
  value: string;
}

export class Signer extends AbstractWeb3Module {
  private utils: any;
  private formatters: formatters;
  constructor (provider: provider) {
    super(provider, {})
    this.utils = Utils
    this.formatters = formatters
  }

  public async sign (message: Hash): Promise<Signature> {
    const method = new AbstractMethod('eth_sign', 2, this.utils, this.formatters, this)
    const address = await this.address()
    method.setArguments([address, message])
    const sign = await method.execute()
    return sign
  }

  public async getAddresses (): Promise<Address[]> {
    const method = new AbstractMethod('eth_accounts', 0, this.utils, this.formatters, this)
    const addresses = await method.execute()

    return addresses
  }

  public async address (): Promise<Address> {
    const addresses = await this.getAddresses()
    return addresses[0]
  }

  public hash (message: string): Hash {
    return Utils.sha3(message)
  }

  public async connect (): Promise<Address[]> {
    const method = new AbstractMethod('eth_requestAccounts', 0, this.utils, this.formatters, this)
    const accounts = await method.execute()
    return accounts
  }
  public async personalSign (message: string): Promise<Signature> {
    const method = new AbstractMethod('personal_sign', 2, this.utils, this.formatters, this)
    const address = await this.address()
    method.setArguments([address, message])
    const sign = await method.execute()
    return sign
  }
  public async personalECRecover (message: string, signature: Signature): Promise<Address> {
    console.log(message, signature)
    const method = new AbstractMethod('personal_ecRecover', 2, this.utils, this.formatters, this)
    method.setArguments([message, signature])
    const address = await method.execute()
    return address
  }

  public async signTypedData (params: TypedData[]): Promise<Signature> {
    console.log(params)
    const account = await this.address()
    const method = new AbstractMethod('eth_signTypedData', 2, this.utils, this.formatters, this)
    method.setArguments([params, account])
    const sign = await method.execute()
    return sign
  }

  public async signTypedDataV3 (verifyingContract: Address, data: TypedMyData.MyData): Promise<Signature> {
    console.log(verifyingContract, data)
    const account = await this.address()
    const params = TypedMyData.make(verifyingContract, data)
    const method = new AbstractMethod('eth_signTypedData_v3', 2, this.utils, this.formatters, this)
    method.setArguments([account, JSON.stringify(params)])
    const sign = await method.execute()
    return sign
  }
}
