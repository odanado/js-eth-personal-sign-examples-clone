<template>
  <div id="app">
    <Hero />
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

@Component({
  components: {
    Hero
  }
})
export default class App extends Vue {
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

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
</style>
