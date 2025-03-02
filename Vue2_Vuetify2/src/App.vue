<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Chatbot Interface</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container fluid class="fill-height">
        <v-row justify="center">
          <v-col cols="12" sm="10" md="8" lg="6">
            <v-card class="elevation-12 chat-container">
              <v-card-title class="headline">
                Chat with AI Assistant
              </v-card-title>
              
              <v-card-text class="chat-messages" ref="chatMessages">
                <v-sheet 
                  v-for="(message, index) in messages" 
                  :key="index"
                  :class="['message-bubble mb-3', message.isUser ? 'user-message' : 'bot-message']"
                  :color="message.isUser ? 'primary lighten-4' : 'grey lighten-3'"
                  rounded
                >
                  <div class="pa-3">
                    <div class="message-sender font-weight-bold">
                      {{ message.isUser ? 'You' : 'AI Assistant' }}
                    </div>
                    <div class="message-content" v-html="formatMessage(message.text)"></div>
                  </div>
                </v-sheet>
                <div v-if="loading" class="text-center my-4">
                  <v-progress-circular indeterminate color="primary"></v-progress-circular>
                </div>
              </v-card-text>
              
              <v-divider></v-divider>
              
              <v-card-actions>
                <v-form @submit.prevent="sendMessage" class="message-form">
                  <v-row no-gutters>
                    <v-col cols="12">
                      <v-textarea
                        v-model="userInput"
                        outlined
                        rows="2"
                        auto-grow
                        hide-details
                        placeholder="Type your message here..."
                        @keydown.enter.prevent="sendMessage"
                      ></v-textarea>
                    </v-col>
                    <v-col cols="12" class="d-flex justify-end mt-2">
                      <v-btn 
                        color="primary" 
                        :disabled="!userInput.trim() || loading" 
                        @click="sendMessage"
                      >
                        <v-icon left>mdi-send</v-icon>
                        Send
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',
  data() {
    return {
      userInput: '',
      messages: [
        { 
          text: 'Hello! I am your AI assistant. How can I help you today?', 
          isUser: false 
        }
      ],
      loading: false,
      apiUrl: process.env.VUE_APP_API_URL || 'http://jptyomdmidd001.onetakeda.com/chat',
      username: process.env.VUE_APP_USERNAME || 'user'
    };
  },
  methods: {
    async sendMessage() {
      if (!this.userInput.trim() || this.loading) return;
      
      // Add user message to chat
      const userMessage = this.userInput.trim();
      this.messages.push({ text: userMessage, isUser: true });
      this.userInput = '';
      this.loading = true;
      
      // Scroll to bottom
      this.$nextTick(() => {
        this.scrollToBottom();
      });
      
      try {
        // Call API
        const response = await axios.post(this.apiUrl, {
          username: this.username,
          query: userMessage
        });
        
        // Check response status
        if (response.data.status === 'success') {
          // Add bot response to chat
          this.messages.push({ 
            text: response.data.message || 'Sorry, I could not process your request.', 
            isUser: false 
          });
        } else {
          throw new Error(response.data.message || 'Unknown error');
        }
      } catch (error) {
        console.error('Error calling API:', error);
        this.messages.push({ 
          text: 'Sorry, there was an error processing your request. Please try again later.', 
          isUser: false 
        });
      } finally {
        this.loading = false;
        
        // Scroll to bottom again after response
        this.$nextTick(() => {
          this.scrollToBottom();
        });
      }
    },
    scrollToBottom() {
      if (this.$refs.chatMessages) {
        const element = this.$refs.chatMessages.$el;
        element.scrollTop = element.scrollHeight;
      }
    },
    formatMessage(text) {
      // Simple formatting to convert URLs to links and handle line breaks
      return text
        .replace(/https?:\/\/[^\s]+/g, url => `<a href="${url}" target="_blank">${url}</a>`)
        .replace(/\n/g, '<br>');
    }
  },
  mounted() {
    // Initial scroll to bottom
    this.scrollToBottom();
  }
};
</script>

<style>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 80vh;
}

.chat-messages {
  flex-grow: 1;
  overflow-y: auto;
  padding: 16px;
  max-height: calc(80vh - 180px);
}

.message-form {
  width: 100%;
  padding: 8px 16px;
}

.message-bubble {
  max-width: 80%;
  word-break: break-word;
}

.user-message {
  margin-left: auto;
}

.bot-message {
  margin-right: auto;
}

.message-sender {
  margin-bottom: 4px;
  font-size: 0.9rem;
}

.message-content {
  white-space: pre-wrap;
}
</style> 