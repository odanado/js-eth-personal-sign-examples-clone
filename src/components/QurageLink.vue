<template>
  <section>
    <qurage-link-modal
      :active.sync="modalActive"
      @update:web3="updateWeb3"
    />
    <input
      class="button is-dark"
      type="submit"
      value="Launch Qurage Link"
      @click="modalActive=true"
    >
  </section>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator'
import QurageLinkModal from '@/components/QurageLinkModal.vue'
import { Signer } from '@/lib/signer'

@Component({
  components: {
    QurageLinkModal
  }
})
export default class QurageLink extends Vue {
  private modalActive: boolean = false

  @Emit('update:web3')
  updateWeb3 () {
    // XX: window.ethereum を使うと `Invalid provider injected!`
    // XX: window.web3.currentProvider では eth_signTypedData と eth_signTypedData_v3 が実装されていない
    // XX: window.ethereum では eth_signTypedData_v3 は実装されているが、eth_signTypedDataはされていない (忘れ？)
    const web3 = (window as any).web3
    this.$signer.setProvider(web3.currentProvider)
  }
}
</script>
