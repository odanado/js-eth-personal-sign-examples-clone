<template>
  <b-modal
    :active.sync="isActive"
  >
    aaa
  </b-modal>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'

@Component({
})
export default class QurageLinkModal extends Vue {
  @Prop(Boolean) active!: boolean
  private isActive: boolean = this.active

  @Emit('update:active')
  updateActive () {
    console.log('update:active')
    return this.isActive
  }
}
</script>
