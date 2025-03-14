interface ChatRequest {
  username: string;
  query: string;
}

interface ChatResponse {
  status: string;
  username: string;
  message: string;
}

export class ChatService {
  //private static readonly API_URL = 'http://jptyomdmidd001.onetakeda.com/chat';
  private static readonly API_URL = 'http://localhost:8000/chat';
  public static async sendMessage(query: string): Promise<ChatResponse> {
    try {
      const request: ChatRequest = {
        username: 'user',
        query: query
      };

      const response = await fetch(this.API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ChatResponse = await response.json();
      if (data.status === 'failed') {
        throw new Error(data.message);
      }

      return data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }
}