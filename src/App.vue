<template>
  <div id="app">
    <Hero />
    <Message
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
    <button @click="onClick">
      click
    </button>
    <input
      class="button"
      type="submit"
      value="poyo"
    >
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Hero from './components/Hero.vue'
import Operation from './components/Operation.vue'
import Message from './components/Message.vue'

@Component({
  components: {
    Hero,
    Operation,
    Message
  }
})
export default class App extends Vue {
  private message!: string;
  private address!: string;
  private signature!: string;
  async created () {
    this.address = await this.$signer.address()
  }
  data () {
    return {
      message: 'poyo',
      address: '',
      signature: ''
    }
  }
  get messageHash () {
    return this.$signer.hash(this.message)
  }
  get operations () {
    return [
      { name: 'Connect', function: this.connect },
      { name: 'Eth_Sign', function: this.ethSign },
      { name: 'personal_sign', function: this.personalSign },
      { name: 'personal_ecRecover', function: this.personalECRecover },
      { name: 'Sign Typed Data', function: this.singTypedData }
    ]
  }
  async connect () {
    const accounts = await this.$signer.connect()
    this.address = accounts[0]
  }
  async ethSign () {
    this.signature = await this.$signer.sign(this.messageHash)
  }
  async personalSign () {
    this.signature = await this.$signer.personalSign(this.message)
  }
  async personalECRecover () {
    if (this.signature !== '') {
      const address = await this.$signer.personalECRecover(this.message, this.signature)
      console.log(address)
    }
  }
  async singTypedData () {
    this.signature = await this.$signer.signTypedData([
      {
        type: 'string',
        name: 'Message',
        value: this.message
      },
      {
        type: 'uint32',
        name: 'A number',
        value: '1337'
      }
    ])
  }
  async onClick () {
    console.log('poyo1')
    console.log(await this.$signer.connect())

    await this.$signer.signTypedData([
      {
        type: 'string',
        name: 'Message',
        value: 'Hi, Alice!'
      },
      {
        type: 'uint32',
        name: 'A number',
        value: '1337'
      }
    ])

    console.log('poyo2')
  }
}
</script>

<style lang="postcss" scoped>
.operations {
  padding: 1rem;
}
</style>
