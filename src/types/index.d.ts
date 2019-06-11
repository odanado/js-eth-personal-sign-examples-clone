import Vue from 'vue'
import { Signer } from '@/lib/signer'

declare module 'vue/types/vue' {
  interface Vue {
    $signer: Signer
  }
}
