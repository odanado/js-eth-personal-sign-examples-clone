<template>
  <div class="operation columns is-mobile">
    <div class="column is-6 is-flex name">
      {{ name }}
    </div>
    <div class="column is-6">
      <input
        class="button is-dark"
        type="submit"
        :value="buttonText"
      >
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
})
export default class Operation extends Vue {
  @Prop(String) name!: string;
  get buttonText (): string {
    return this.name.toLowerCase()
  }
}
</script>

<style lang="postcss" scoped>
.operation:not(:last-child) {
  border-bottom: 1px solid #dee2e6;
}
.name {
  align-items: center;
}
</style>
