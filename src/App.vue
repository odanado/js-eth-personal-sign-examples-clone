<template>
  <div id="app">
    <Hero />
    <Message
      :message.sync="message"
      :message-hash.sync="messageHash"
    />
    <div class="operations">
      <Operation
        v-for="op in operations"
        :key="op.name"
        :name="op.name"
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
  data () {
    return {
      message: 'poyo'
    }
  }
  get messageHash () {
    return this.$signer.hash(this.message)
  }
  get operations () {
    return [
      { name: 'Connect' },
      { name: 'Eth_Sign' },
      { name: 'personal_sign' },
      { name: 'personal_ecRecover' },
      { name: 'Sign Typed Data' }
    ]
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
