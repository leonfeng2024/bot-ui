import React, { useState, useRef, useEffect } from 'react';
import '../../css/ChatWindow/ChatWindow.css';
import ChatPanel from '../ChatPanel/ChatPanel';
import { ChatService } from '../../services/ChatService';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    setInputValue('');

    try {
      const response = await ChatService.sendMessage(inputValue);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.message,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: error instanceof Error ? error.message : 'Failed to send message',
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
      console.error('Failed to get bot response:', error);
    }
  };

  return (
    <div className="cw-container">
      <div className="cw-messages">
        <ChatPanel messages={messages} />
        <div ref={messagesEndRef} />
      </div>
      <div className="cw-input-area">
        <textarea
          className="cw-input"
          placeholder="Please input your question..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
        />
        <button 
          className="cw-send-button"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;