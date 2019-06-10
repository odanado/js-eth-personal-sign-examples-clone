<template>
  <b-modal
    :active="isActive"
    @close="close"
    :width="640"
  >
    >
    <section class="card">
      <header class="card-header">
        <p class="card-header-title">
          コードを読み込んでください
        </p>
      </header>
      <div class="card-image">
        <canvas
          ref="canvas"
        />
      </div>
    </section>
  </b-modal>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from 'vue-property-decorator'
import { QurageLinkFactory, LinkResult } from '@uniqys/qurage-link-lib'

@Component({
})
export default class QurageLinkModal extends Vue {
  @Prop(Boolean) active!: boolean
  private qurageLink = QurageLinkFactory.create({ endpoint: 'http://example.com' })
  private isActive: boolean = this.active

  @Emit('update:active')
  updateActive () {
    return this.isActive
  }

  @Watch('active')
  async changeActive (val: boolean) {
    console.log('changeActive', val)
    this.isActive = val
    if (!val) return
    await this.qurageLink.unlink()

    await this.$nextTick()
    const canvas = this.$refs.canvas as HTMLCanvasElement
    const linkResult = await this.qurageLink.linkWithQRCode(canvas)
    this.$emit('update:active', false)
  }

  close () {
    this.isActive = false
    this.updateActive()
  }
}
</script>
