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

<script>
import TopMenuBar from './components/TopMenuBar.vue';
import ChatWindow from './components/ChatWindow.vue';
import ChatPanel from './components/ChatPanel.vue';

export default {
  name: 'App',
  components: {
    TopMenuBar,
    ChatWindow,
    ChatPanel,
  },
  data() {
    return {
      messages: [],
      isLoading: false
    }
  },
  created() {
    this.messages = [
      {
        username: 'bot',
        message: 'Hello! How can I help you today?',
        status: 'success'
      }
    ];
  },
  methods: {
    async handleSubmit(request) {
      if (this.isLoading) return;

      const userMessage = {
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

        const data = await response.json();
        
        const botMessage = {
          username: data.username,
          message: data.message,
          status: data.status
        };
        
        this.messages.push(botMessage);
      } catch (error) {
        const errorMessage = {
          username: 'bot',
          message: 'Sorry, there was an error processing your request.',
          status: 'failed'
        };
        this.messages.push(errorMessage);
      } finally {
        this.isLoading = false;
      }
    },
    handleFileUpload(file) {
      console.log('File uploaded:', file.name);
    }
  }
}
</script> 