import Vue from 'vue'
import App from './App.vue'

import Signer from '@/lib/signer'

Vue.use({
  install (Vue) {
    const signer = new Signer((window as any).web3.currentProvider)
    Object.defineProperty(Vue.prototype, '$signer', {
      get () { return signer }
    })
  }
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
