<template>
  <div class="border-t border-gray-200 bg-white p-4">
    <form @submit.prevent="handleSubmit" class="max-w-3xl mx-auto">
      <div class="flex items-end gap-4">
        <div class="flex-1">
          <textarea
            v-model="message"
            placeholder="Type your message here..."
            class="w-full resize-none rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
            rows="1"
            @keydown.enter.prevent="handleEnterKey"
          />
        </div>
        <div class="flex gap-2">
          <button
            type="button"
            @click="triggerFileUpload"
            class="rounded-lg border border-gray-300 p-3 hover:bg-gray-50"
          >
            📎
          </button>
          <button
            type="submit"
            class="rounded-lg bg-blue-600 px-4 py-3 text-white hover:bg-blue-700"
            :disabled="!message.trim()"
          >
            Submit
          </button>
        </div>
      </div>
      <input
        ref="fileInput"
        type="file"
        class="hidden"
        @change="handleFileChange"
      />
    </form>
  </div>
</template>

<script>
export default {
  name: 'ChatPanel',
  data() {
    return {
      message: ''
    }
  },
  methods: {
    handleSubmit() {
      if (!this.message.trim()) return;

      const request = {
        username: 'user',
        query: this.message.trim()
      };

      this.$emit('submit', request);
      this.message = '';
    },
    handleEnterKey(e) {
      if (!e.shiftKey) {
        this.handleSubmit();
      }
    },
    triggerFileUpload() {
      this.$refs.fileInput.click();
    },
    handleFileChange(e) {
      const file = e.target.files?.[0];
      if (file) {
        this.$emit('file-upload', file);
      }
    }
  }
}
</script> 