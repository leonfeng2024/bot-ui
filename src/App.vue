<template>
  <div class="flex flex-col h-screen bg-gray-50">
    <TopMenuBar />
    <main class="flex-1 flex flex-col">
      <ChatWindow :messages="messages" />
      <ChatPanel 
        @submit="handleSubmit" 
        @file-upload="handleFileUpload" 
      />
    </main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TopMenuBar from '@/components/TopMenuBar.vue';
import ChatWindow from '@/components/ChatWindow.vue';
import ChatPanel from '@/components/ChatPanel.vue';
import { ChatMessage, ChatRequest, ChatResponse } from '@/types/chat';

@Component({
  components: {
    TopMenuBar,
    ChatWindow,
    ChatPanel,
  },
})
export default class App extends Vue {
  messages: ChatMessage[] = [];
  isLoading = false;

  created() {
    this.messages = [
      {
        username: 'bot',
        message: 'Hello! How can I help you today?',
        status: 'success'
      }
    ];
  }

  async handleSubmit(request: ChatRequest) {
    if (this.isLoading) return;

    const userMessage: ChatMessage = {
      username: 'user',
      message: request.query
    };
    this.messages.push(userMessage);
    this.isLoading = true;

    try {
      const response = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      const data: ChatResponse = await response.json();
      
      const botMessage: ChatMessage = {
        username: data.username,
        message: data.message,
        status: data.status
      };
      
      this.messages.push(botMessage);
    } catch (error) {
      const errorMessage: ChatMessage = {
        username: 'bot',
        message: 'Sorry, there was an error processing your request.',
        status: 'failed'
      };
      this.messages.push(errorMessage);
    } finally {
      this.isLoading = false;
    }
  }

  handleFileUpload(file: File) {
    console.log('File uploaded:', file.name);
  }
}
</script> 