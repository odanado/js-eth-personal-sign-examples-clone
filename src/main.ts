import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

import { Signer } from '@/lib/signer'

import * as Sentry from '@sentry/browser'
import * as Integrations from '@sentry/integrations'

Sentry.init({
  dsn: 'https://d5e170bee28741ee9557160240e9e377@sentry.io/1478716',
  integrations: [new Integrations.Vue({ Vue, attachProps: true })]
})

function getProvider (window: any) {
  if (window.ethereum) {
    return window.ethereum
  }
  if (window.web3) {
    return window.web3.currentProvider
  }

  console.error('Please use dapp browser')
}

Vue.use(Buefy)

Vue.use({
  install (Vue) {
    const signer = new Signer(getProvider(window))
    Object.defineProperty(Vue.prototype, '$signer', {
      get () { return signer }
    })
  }
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
