# RHEL 7.9 部署指南

本指南将帮助您在 RHEL 7.9 服务器上部署 Vue2 + Vuetify2 聊天机器人应用。

## 前提条件

- RHEL 7.9 服务器
- Node.js 16.20.0 已安装
- npm 8.x 或更高版本已安装
- 网络服务器（如 Apache 或 Nginx）已安装

## 构建应用

在开发机器上执行以下步骤：

1. 安装依赖：
```bash
cd Vue2_Vuetify2
npm install
```

2. 创建生产构建：
```bash
npm run build
```

3. 构建完成后，`dist` 目录将包含所有静态文件。

## 部署到 RHEL 7.9 服务器

1. 将 `dist` 目录中的所有文件传输到 RHEL 7.9 服务器：
```bash
# 使用 scp 或其他工具
scp -r dist/* user@your-rhel-server:/path/to/web/root
```

2. 配置网络服务器

### Apache 配置示例

创建或编辑 Apache 虚拟主机配置：

```apache
<VirtualHost *:80>
    ServerName your-domain.com
    DocumentRoot /path/to/web/root
    
    <Directory "/path/to/web/root">
        AllowOverride All
        Require all granted
        
        # 处理 Vue Router 的历史模式
        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
    </Directory>
    
    # 代理 API 请求到后端服务器
    ProxyPass /chat http://jptyomdmidd001.onetakeda.com/chat
    ProxyPassReverse /chat http://jptyomdmidd001.onetakeda.com/chat
</VirtualHost>
```

### Nginx 配置示例

创建或编辑 Nginx 站点配置：

```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    root /path/to/web/root;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # 代理 API 请求到后端服务器
    location /chat {
        proxy_pass http://jptyomdmidd001.onetakeda.com/chat;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

3. 重启网络服务器：

对于 Apache：
```bash
sudo systemctl restart httpd
```

对于 Nginx：
```bash
sudo systemctl restart nginx
```

## 故障排除

1. **静态文件无法加载**：
   - 检查网络服务器配置中的路径是否正确
   - 确保文件权限允许网络服务器读取文件

2. **API 请求失败**：
   - 确保后端 API 服务器正在运行
   - 检查代理配置是否正确
   - 查看网络服务器错误日志

3. **页面显示空白**：
   - 在浏览器中打开开发者工具，查看控制台错误
   - 确保 index.html 文件可以被访问

4. **兼容性问题**：
   - 如果在旧版浏览器中遇到问题，可能需要添加 polyfills
   - 考虑在 `.browserslistrc` 文件中调整目标浏览器 