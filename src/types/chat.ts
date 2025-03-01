export interface ChatMessage {
    username: string;
    message: string;
    status?: 'success' | 'failed';
}

export interface ChatRequest {
    username: string;
    query: string;
}

export interface ChatResponse {
    status: 'success' | 'failed';
    username: string;
    message: string;
} 