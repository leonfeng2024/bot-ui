<template>
  <div class="flex-1 overflow-y-auto p-4 bg-gray-50" ref="chatContainer">
    <div class="max-w-3xl mx-auto space-y-4">
      <div
        v-for="(message, index) in messages"
        :key="index"
        :class="['flex', message.username === 'user' ? 'justify-end' : 'justify-start']"
      >
        <div
          :class="[
            'max-w-[80%] rounded-lg p-3',
            message.username === 'user'
              ? 'bg-blue-600 text-white'
              : 'bg-white border border-gray-200'
          ]"
        >
          <p class="text-sm">{{ message.message }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatWindow',
  props: {
    messages: {
      type: Array,
      required: true
    }
  },
  watch: {
    messages: {
      handler() {
        this.$nextTick(() => {
          this.scrollToBottom();
        });
      },
      deep: true
    }
  },
  methods: {
    scrollToBottom() {
      const container = this.$refs.chatContainer;
      container.scrollTop = container.scrollHeight;
    }
  },
  mounted() {
    this.scrollToBottom();
  }
}
</script> 