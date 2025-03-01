# HTML + CSS + JavaScript 聊天机器人界面

这是一个使用纯 HTML、CSS 和 JavaScript 构建的聊天机器人界面，不依赖于任何前端框架或 Node.js，可以直接在浏览器中运行，非常适合部署在 RHEL 7.9 等老旧系统上。

## 特点

- **纯前端实现**：不需要 Node.js 或其他服务器端技术
- **响应式设计**：适配各种屏幕尺寸
- **简洁美观**：现代化的 UI 设计
- **易于配置**：通过 config.js 文件轻松修改 API 地址等配置
- **完整功能**：支持发送消息、接收回复、加载动画、自动滚动等功能

## 文件结构

- `index.html` - HTML 结构
- `styles.css` - CSS 样式
- `script.js` - JavaScript 功能实现
- `config.js` - 配置文件

## 使用方法

### 本地测试

1. 下载所有文件到本地目录
2. 在浏览器中打开 `index.html` 文件

### 部署到服务器

1. 将所有文件上传到 Web 服务器的目录中
2. 确保 Web 服务器（如 Apache 或 Nginx）已正确配置
3. 修改 `config.js` 文件中的 `API_URL` 为您的实际 API 地址

## 配置选项

在 `config.js` 文件中，您可以修改以下配置：

```javascript
const CONFIG = {
    // API 地址
    API_URL: 'http://localhost:8000/chat',
    
    // 初始欢迎消息
    WELCOME_MESSAGE: '您好！我是您的 AI 助手。有什么可以帮助您的吗？',
    
    // 错误消息
    ERROR_MESSAGE: '抱歉，发生了错误。请稍后再试。',
    
    // 默认回复（当 API 没有返回有效响应时）
    DEFAULT_RESPONSE: '抱歉，我无法理解您的请求。'
};
```

## API 要求

后端 API 应接受 POST 请求，请求体格式为：

```json
{
  "message": "用户输入的消息"
}
```

API 应返回 JSON 格式的响应，格式为：

```json
{
  "response": "AI 助手的回复"
}
```

## 浏览器兼容性

- Chrome 49+
- Firefox 52+
- Safari 10+
- Edge 14+
- Internet Explorer 11

## 在 RHEL 7.9 上部署

### 使用 Apache

1. 安装 Apache（如果尚未安装）：
   ```
   sudo yum install httpd
   ```

2. 启动 Apache 服务：
   ```
   sudo systemctl start httpd
   sudo systemctl enable httpd
   ```

3. 将文件复制到 Apache 的文档根目录：
   ```
   sudo cp -r * /var/www/html/
   ```

4. 配置 Apache 以处理 API 请求（如果 API 在同一服务器上）：
   
   创建或编辑 `/etc/httpd/conf.d/chatbot.conf`：
   ```
   <VirtualHost *:80>
       ServerName your-server-name
       DocumentRoot /var/www/html
       
       # 代理 API 请求
       ProxyPass /chat http://localhost:8000/chat
       ProxyPassReverse /chat http://localhost:8000/chat
   </VirtualHost>
   ```

5. 重启 Apache：
   ```
   sudo systemctl restart httpd
   ```

### 使用 Nginx

1. 安装 Nginx（如果尚未安装）：
   ```
   sudo yum install nginx
   ```

2. 启动 Nginx 服务：
   ```
   sudo systemctl start nginx
   sudo systemctl enable nginx
   ```

3. 将文件复制到 Nginx 的文档根目录：
   ```
   sudo cp -r * /usr/share/nginx/html/
   ```

4. 配置 Nginx 以处理 API 请求（如果 API 在同一服务器上）：
   
   创建或编辑 `/etc/nginx/conf.d/chatbot.conf`：
   ```
   server {
       listen 80;
       server_name your-server-name;
       
       root /usr/share/nginx/html;
       index index.html;
       
       location / {
           try_files $uri $uri/ =404;
       }
       
       # 代理 API 请求
       location /chat {
           proxy_pass http://localhost:8000/chat;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }
   }
   ```

5. 重启 Nginx：
   ```
   sudo systemctl restart nginx
   ```

## 故障排除

1. **无法连接到 API**：
   - 检查 `config.js` 中的 API_URL 是否正确
   - 确保 API 服务器正在运行
   - 检查网络连接和防火墙设置

2. **页面样式不正确**：
   - 确保所有 CSS 文件都已正确加载
   - 尝试清除浏览器缓存

3. **发送消息后没有响应**：
   - 打开浏览器开发者工具，查看控制台错误
   - 检查 API 响应格式是否正确 