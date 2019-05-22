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
    console.log(address, message)
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
    console.log(message)
    return Utils.sha3(message)
  }

  public async connect (): Promise<Address[]> {
    return []
  }
  public async personalSign (message: string): Promise<string> {
    console.log(message)
    return ''
  }
  public async personalECRecover (message: string, signature: Signature): Promise<Address> {
    console.log(message, signature)
    return ''
  }

  public async signTypedData (params: TypedData[]): Promise<Signature> {
    console.log(params)
    return ''
  }

  public async signTypedDataV3 (verifyingContract: Address, data: TypedMyData.MyData): Promise<Signature> {
    console.log(verifyingContract, data)
    return ''
  }
}
