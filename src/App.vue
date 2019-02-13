<template>
  <div id="app">
    <Hero />
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

@Component({
  components: {
    Hero,
    Operation
  }
})
export default class App extends Vue {
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
