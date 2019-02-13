<template>
  <div class="message">
    <b-field label="Address">
      <span class="ellipsis-text is-size-7">
        {{ address }}
      </span>
    </b-field>
    <b-field label="Message">
      <b-input
        :value="message"
        @input="updateMessage"
      />
    </b-field>
    <b-field label="MessageHash">
      <span class="ellipsis-text is-size-7">
        {{ messageHash }}
      </span>
    </b-field>
    <b-field label="signature">
      <span class="ellipsis-text is-size-7">
        {{ signature }}
      </span>
    </b-field>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'

@Component({
})
export default class Message extends Vue {
  @Prop(String) address!: string;
  @Prop(String) message!: string;
  @Prop(String) messageHash!: string;
  @Prop(String) signature!: string;
  @Emit('update:message')
  updateMessage (event: any) {
    console.log(event)
    return event
  }
}
</script>
<style lang="postcss" scoped>
.message {
  padding: 1rem;
}

.ellipsis-text {
  width: 100%;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
