import React, { useState, useRef, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Navbar } from 'react-bootstrap';
import axios from 'axios';
import './App.css';

function App() {
  const [messages, setMessages] = useState([
    { text: 'Hello! I am your AI assistant. How can I help you today?', isUser: false }
  ]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const apiUrl = process.env.REACT_APP_API_URL || 'http://jptyomdmidd001.onetakeda.com/chat';
  const username = process.env.REACT_APP_USERNAME || 'user';

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Format message text (convert URLs to links and handle line breaks)
  const formatMessage = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const formattedText = text
      .replace(urlRegex, (url) => `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`)
      .replace(/\n/g, '<br />');
    
    return { __html: formattedText };
  };

  // Send message to API
  const sendMessage = async (e) => {
    e.preventDefault();
    
    if (!userInput.trim() || loading) return;
    
    // Add user message to chat
    const userMessage = userInput.trim();
    setMessages(prevMessages => [...prevMessages, { text: userMessage, isUser: true }]);
    setUserInput('');
    setLoading(true);
    setError(null);
    
    try {
      // Call API
      const response = await axios.post(apiUrl, {
        username: username,
        query: userMessage
      });
      
      // Check response status
      if (response.data.status === 'success') {
        // Add bot response to chat
        setMessages(prevMessages => [
          ...prevMessages, 
          { text: response.data.message || 'Sorry, I could not process your request.', isUser: false }
        ]);
      } else {
        throw new Error(response.data.message || 'Unknown error');
      }
    } catch (err) {
      console.error('Error calling API:', err);
      setError('Sorry, there was an error processing your request. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <Navbar bg="primary" variant="dark" className="mb-4">
        <Container>
          <Navbar.Brand>Chatbot Interface</Navbar.Brand>
        </Container>
      </Navbar>

      <Container>
        <Row className="justify-content-md-center">
          <Col xs={12} md={10} lg={8}>
            <Card className="chat-container">
              <Card.Header as="h5">Chat with AI Assistant</Card.Header>
              <Card.Body className="chat-messages">
                {messages.map((message, index) => (
                  <div 
                    key={index} 
                    className={`message ${message.isUser ? 'user-message' : 'bot-message'}`}
                  >
                    <div className="message-sender">
                      {message.isUser ? 'You' : 'AI Assistant'}
                    </div>
                    <div 
                      className="message-content"
                      dangerouslySetInnerHTML={formatMessage(message.text)}
                    />
                  </div>
                ))}
                {loading && (
                  <div className="text-center my-3">
                    <div className="spinner"></div>
                  </div>
                )}
                {error && (
                  <Alert variant="danger" className="mt-3">
                    {error}
                  </Alert>
                )}
                <div ref={messagesEndRef} />
              </Card.Body>
              <Card.Footer>
                <Form onSubmit={sendMessage}>
                  <Form.Group>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      placeholder="Type your message here..."
                      disabled={loading}
                    />
                  </Form.Group>
                  <div className="d-flex justify-content-end mt-2">
                    <Button 
                      variant="primary" 
                      type="submit"
                      disabled={!userInput.trim() || loading}
                    >
                      Send
                    </Button>
                  </div>
                </Form>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App; 