import { Provider } from 'web3/providers'

declare module 'web3/providers' {
  export interface Provider {
    // for EIP-1102
    // TODO: use eth.requestAccounts
    enable(): Promise<string[]>;
  }
}
