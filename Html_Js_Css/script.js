// DOM 元素
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    // 添加欢迎消息
    addMessage(CONFIG.WELCOME_MESSAGE, false);
    
    // 聚焦输入框
    userInput.focus();
    
    // 监听发送按钮点击
    sendButton.addEventListener('click', sendMessage);
    
    // 监听输入框回车键
    userInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
});

// 发送消息
async function sendMessage() {
    const message = userInput.value.trim();
    
    // 如果消息为空，不处理
    if (!message) return;
    
    // 清空输入框
    userInput.value = '';
    
    // 添加用户消息到聊天窗口
    addMessage(message, true);
    
    // 显示加载动画
    const loadingElement = showLoading();
    
    try {
        // 禁用发送按钮
        sendButton.disabled = true;
        
        // 调用 API
        const response = await fetchBotResponse(message);
        
        // 移除加载动画
        loadingElement.remove();
        
        // 添加机器人回复到聊天窗口
        addMessage(response, false);
    } catch (error) {
        // 移除加载动画
        loadingElement.remove();
        
        // 显示错误消息
        addMessage(CONFIG.ERROR_MESSAGE, false);
        console.error('Error:', error);
    } finally {
        // 重新启用发送按钮
        sendButton.disabled = false;
        
        // 聚焦输入框
        userInput.focus();
    }
}

// 添加消息到聊天窗口
function addMessage(text, isUser) {
    // 创建消息元素
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    
    // 创建消息内容
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    // 创建发送者标签
    const senderDiv = document.createElement('div');
    senderDiv.className = 'message-sender';
    senderDiv.textContent = isUser ? '您' : 'AI 助手';
    
    // 创建消息文本
    const textDiv = document.createElement('div');
    textDiv.className = 'message-text';
    textDiv.innerHTML = formatMessage(text);
    
    // 组装消息
    contentDiv.appendChild(senderDiv);
    contentDiv.appendChild(textDiv);
    messageDiv.appendChild(contentDiv);
    
    // 添加到聊天窗口
    chatMessages.appendChild(messageDiv);
    
    // 滚动到底部
    scrollToBottom();
}

// 显示加载动画
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

// 调用 API 获取机器人回复
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
        
        // 检查响应状态
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

// 格式化消息（将链接转换为可点击的链接，处理换行符）
function formatMessage(text) {
    // 将 URL 转换为链接
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const withLinks = text.replace(urlRegex, url => `<a href="${url}" target="_blank">${url}</a>`);
    
    // 处理换行符
    return withLinks.replace(/\n/g, '<br>');
}

// 滚动到聊天窗口底部
function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
} 