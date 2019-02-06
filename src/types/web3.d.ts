import { Eth } from 'web3-eth'
import { EthereumProvider } from 'web3-providers'

declare module 'web3-eth' {
  export interface Eth {
    requestAccounts(callback?: (error: Error, result: string[]) => void): Promise<string[]>;
  }
}

declare module 'web3-providers' {
  export interface EthereumProvider {
    send(method: string, parameters: any[]): Promise<object>;
    enable(): Promise<string[]>;
  }
}

/*
import Eth from 'web3/eth'

declare module 'web3/eth' {
  export default interface Eth {
    requestAccounts(): void;
  }
}
*/

//* /
/*
declare module 'web3' {
  import Web3 from 'web3'
  export default Web3

  interface eth {
    requestAccounts(): void;
  }
}
*/
