<template>
  <div id="app">
    <Hero />
    <div class="container">
      <div class="columns is-centered">
        <qurage-link @update:web3="updateWeb3" />
      </div>
      <Message
        class="is-white"
        :address="address"
        :message.sync="message"
        :message-hash.sync="messageHash"
        :signature="signature"
      />
      <div class="operations">
        <Operation
          v-for="op in operations"
          :key="op.name"
          :name="op.name"
          @click="op.function"
        />
      </div>
      <a
        href="https://github.com/odanado/js-eth-personal-sign-examples-clone"
        target="_blank"
      >
        View the source code on Github
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Signer } from '@/lib/signer'
import Hero from './components/Hero.vue'
import Operation from './components/Operation.vue'
import Message from './components/Message.vue'
import QurageLink from './components/QurageLink.vue'

@Component({
  components: {
    Hero,
    Operation,
    Message,
    QurageLink
  }
})
export default class App extends Vue {
  private message: string = 'poyo';
  private address: string = '';
  private signature: string = '';
  // T | undefinedだとダメなのでT | falseにする ref:https://github.com/vuejs/vue-class-component/pull/35
  private signer: Signer | false = false;
  private poyo?: string = 'poyo';

  async created () {
    this.updateWeb3()
  }
  async updateWeb3 () {
    const provider = this.getProvider(window)
    if (provider) {
      if (this.signer) {
        this.signer.setProvider(provider)
      } else {
        console.info('init Signer')
        this.signer = new Signer(provider)
      }
      this.address = await this.signer.address()
    } else {
      this.$toast.open('Please use dapp browser!')
    }
  }
  getProvider (window: any) {
    // XX: qurage link待ち
    if (window.ethereum.currentProvider) {
      return window.ethereum.currentProvider
    }
    if (window.web3) {
      return window.web3.currentProvider
    }
    if (window.ethereum) {
      return window.ethereum
    }
    console.warn('Please use dapp browser')
  }
  get messageHash () {
    if (this.signer) {
      return this.signer.hash(this.message)
    }
    return ''
  }
  get operations () {
    return [
      { name: 'Connect', function: this.connect },
      { name: 'Eth_Sign', function: this.ethSign },
      { name: 'personal_sign', function: this.personalSign },
      { name: 'personal_ecRecover', function: this.personalECRecover },
      { name: 'Sign Typed Data', function: this.singTypedData },
      { name: 'Sign Typed Data V3', function: this.singTypedDataV3 }
    ]
  }
  async connect () {
    if (!this.signer) return ''
    const accounts = await this.signer.connect()
    this.address = accounts[0]
    this.$toast.open(`connect: ${this.address}`)
  }
  async ethSign () {
    if (!this.signer) return
    this.signature = await this.signer.sign(this.messageHash)
  }
  async personalSign () {
    if (!this.signer) return
    this.signature = await this.signer.personalSign(this.message)
  }
  async personalECRecover () {
    if (!this.signer) return
    if (this.signature !== '') {
      const address = await this.signer.personalECRecover(this.message, this.signature)
      this.$toast.open(`recover: ${address}`)
    }
  }
  async singTypedData () {
    if (!this.signer) return
    this.signature = await this.signer.signTypedData([
      {
        type: 'string',
        name: 'Message',
        value: this.message
      },
      {
        type: 'uint32',
        name: 'Amount',
        value: '1337'
      }
    ])
  }
  async singTypedDataV3 () {
    if (!this.signer) return
    this.signature = await this.signer.signTypedDataV3(
      '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
      {
        message: this.message,
        amount: 1337
      }
    )
  }
}
</script>

<style lang="postcss" scoped>
.operations {
  padding: 1rem;
}
</style>
