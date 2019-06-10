<template>
  <b-modal
    :active="isActive"
    @close="close"
  >
    aaa
  </b-modal>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from 'vue-property-decorator'

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

  @Watch('active')
  changeActive (val: boolean) {
    this.isActive = val
  }

  close () {
    this.isActive = false
    this.updateActive()
  }
}
</script>
