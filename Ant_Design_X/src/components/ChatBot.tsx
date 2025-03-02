import React, { useState, useRef, useEffect } from 'react';
import { Layout, Input, Button, Avatar, List, Typography } from 'antd';
import { SendOutlined, UserOutlined, RobotOutlined } from '@ant-design/icons';
import '../styles/ChatBot.css';

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
      content: '你好！我是你的AI助手，有什么我可以帮助你的吗？',
      type: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 自动滚动到最新消息
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 处理发送消息
  const handleSend = () => {
    if (!input.trim()) return;

    // 添加用户消息
    const userMessage: Message = {
      content: input,
      type: 'user',
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInput('');

    // 模拟机器人回复
    setTimeout(() => {
      const botMessage: Message = {
        content: `我收到了你的消息: "${input}"`,
        type: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
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
        <h1>AI 聊天助手</h1>
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
            placeholder="请输入消息..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            size="large"
          />
          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={handleSend}
            size="large"
          >
            发送
          </Button>
        </div>
      </Footer>
    </Layout>
  );
};

export default ChatBot; 