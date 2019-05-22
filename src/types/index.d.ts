import Vue from 'vue'
// import Signer from '@/lib/signer'
import { Signer } from '@/lib/poyo'

declare module 'vue/types/vue' {
  interface Vue {
    $signer: Signer
  }
}
