<template>
  <div class="flex justify-between items-center px-4 py-2 bg-white border-b border-gray-200">
    <div class="flex items-center">
      <div class="text-2xl font-bold text-blue-600">
        ChatBot
      </div>
    </div>
    <div class="w-10 h-10 rounded-full overflow-hidden">
      <img
        src="/user_icon.png"
        alt="User Profile"
        class="w-full h-full object-cover"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class TopMenuBar extends Vue {}
</script> 