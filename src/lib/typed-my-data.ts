import { TypedData as TypedDataV3 } from '@uniqys/tx-proxy-lib'
import { Address } from './types'

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
