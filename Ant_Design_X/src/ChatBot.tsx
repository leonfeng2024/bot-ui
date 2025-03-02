import React, { useState, useRef, useEffect } from 'react';
import { Layout, Input, Button, Avatar, List, Typography } from 'antd';
import { SendOutlined, UserOutlined, RobotOutlined } from '@ant-design/icons';
import './styles/ChatBot.css';

const { Header, Content, Footer } = Layout;
const { Text } = Typography;

interface Message {
  content: string;
  type: 'user' | 'bot';
  timestamp: Date;
}

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      content: 'Hello! I am your AI assistant. How can I help you?',
      type: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 自动滚动到最新消息
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 处理发送消息
  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    // 添加用户消息
    const userMessage: Message = {
      content: input,
      type: 'user',
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          username: 'user',
          query: input 
        }),
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      
      if (data.status === 'success') {
        const botMessage: Message = {
          content: data.message || 'Sorry, I cannot answer right now.',
          type: 'bot',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, botMessage]);
      } else {
        throw new Error('API response status error');
      }
    } catch (error) {
      console.error('API call error:', error);
      const errorMessage: Message = {
        content: 'Sorry, an error occurred. Please try again later.',
        type: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // 处理按Enter键发送
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <Layout className="chat-container">
      <Header className="chat-header">
        <div className="logo" />
        <h1>AI Chat Assistant</h1>
      </Header>
      <Content className="chat-content">
        <List
          className="message-list"
          itemLayout="horizontal"
          dataSource={messages}
          renderItem={(message) => (
            <List.Item className={`message-item ${message.type}`}>
              <List.Item.Meta
                avatar={
                  message.type === 'user' ? (
                    <Avatar icon={<UserOutlined />} />
                  ) : (
                    <Avatar icon={<RobotOutlined />} style={{ backgroundColor: '#1890ff' }} />
                  )
                }
                description={
                  <div className="message-content">
                    <Text>{message.content}</Text>
                    <div className="message-time">
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                }
              />
            </List.Item>
          )}
        />
        <div ref={messagesEndRef} />
      </Content>
      <Footer className="chat-footer">
        <div className="input-container">
          <Input
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            size="large"
            disabled={isLoading}
          />
          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={handleSend}
            size="large"
            loading={isLoading}
          >
            Send
          </Button>
        </div>
      </Footer>
    </Layout>
  );
};

export default ChatBot; 