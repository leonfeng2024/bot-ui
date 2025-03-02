// DOM elements
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    // Add welcome message
    addMessage(CONFIG.WELCOME_MESSAGE, false);
    
    // Focus input field
    userInput.focus();
    
    // Listen for send button click
    sendButton.addEventListener('click', sendMessage);
    
    // Listen for Enter key in input field
    userInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
});

// Send message
async function sendMessage() {
    const message = userInput.value.trim();
    
    // Don't process if message is empty
    if (!message) return;
    
    // Clear input field
    userInput.value = '';
    
    // Add user message to chat window
    addMessage(message, true);
    
    // Show loading animation
    const loadingElement = showLoading();
    
    try {
        // Disable send button
        sendButton.disabled = true;
        
        // Call API
        const response = await fetchBotResponse(message);
        
        // Remove loading animation
        loadingElement.remove();
        
        // Add bot response to chat window
        addMessage(response, false);
    } catch (error) {
        // Remove loading animation
        loadingElement.remove();
        
        // Show error message
        addMessage(CONFIG.ERROR_MESSAGE, false);
        console.error('Error:', error);
    } finally {
        // Re-enable send button
        sendButton.disabled = false;
        
        // Focus input field
        userInput.focus();
    }
}

// Add message to chat window
function addMessage(text, isUser) {
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    
    // Create message content
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    // Create sender label
    const senderDiv = document.createElement('div');
    senderDiv.className = 'message-sender';
    senderDiv.textContent = isUser ? 'You' : 'AI Assistant';
    
    // Create message text
    const textDiv = document.createElement('div');
    textDiv.className = 'message-text';
    textDiv.innerHTML = formatMessage(text);
    
    // Assemble message
    contentDiv.appendChild(senderDiv);
    contentDiv.appendChild(textDiv);
    messageDiv.appendChild(contentDiv);
    
    // Add to chat window
    chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    scrollToBottom();
}

// Show loading animation
function showLoading() {
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'loading';
    
    for (let i = 0; i < 3; i++) {
        const dot = document.createElement('div');
        dot.className = 'loading-dot';
        loadingDiv.appendChild(dot);
    }
    
    chatMessages.appendChild(loadingDiv);
    scrollToBottom();
    
    return loadingDiv;
}

// Call API to get bot response
async function fetchBotResponse(message) {
    try {
        const response = await fetch(CONFIG.API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: CONFIG.USERNAME,
                query: message
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Check response status
        if (data.status === 'success') {
            return data.message || CONFIG.DEFAULT_RESPONSE;
        } else {
            console.error('API Error:', data.message);
            throw new Error(data.message || 'Unknown error');
        }
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// Format message (convert URLs to clickable links, handle newlines)
function formatMessage(text) {
    // Convert URLs to links
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const withLinks = text.replace(urlRegex, url => `<a href="${url}" target="_blank">${url}</a>`);
    
    // Handle newlines
    return withLinks.replace(/\n/g, '<br>');
}

// Scroll to bottom of chat window
function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
} 