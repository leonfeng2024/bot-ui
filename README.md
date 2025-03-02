# 聊天机器人界面项目

本项目包含三个不同技术栈实现的聊天机器人界面，并通过 Nginx 进行统一访问。

## 项目结构

- `Html_Js_Css/`: 使用纯 HTML、CSS 和 JavaScript 实现的聊天界面
- `Vue2_Vuetify2/`: 使用 Vue 2 和 Vuetify 2 实现的聊天界面
- `React_Bootstrap3/`: 使用 React 和 Bootstrap 3 实现的聊天界面
- `nginx.conf`: Nginx 配置文件
- `start-services.sh`: 启动所有服务的脚本

## 端口分配

- Html_Js_Css: 8081
- Vue2_Vuetify2: 8082
- React_Bootstrap3: 8083
- API 服务: 8000

## 部署步骤

### 1. 安装 Nginx

根据您的操作系统安装 Nginx：

- RHEL 7.9:
  ```bash
  sudo yum install nginx
  ```

### 2. 配置 Nginx

将 `nginx.conf` 文件复制到 Nginx 配置目录：

```bash
# 根据您的系统路径可能需要调整
sudo cp nginx.conf /etc/nginx/conf.d/bot-ui.conf
```

修改配置文件中的路径，将 `/path/to/Html_Js_Css/` 替换为实际路径。

### 3. 启动服务

给启动脚本添加执行权限：

```bash
chmod +x start-services.sh
```

运行启动脚本：

```bash
./start-services.sh
```

### 4. 启动 Nginx

```bash
sudo systemctl start nginx
# 或
sudo service nginx start
```

## 访问地址

- HTML/JS/CSS 版本: http://jptyomdmidd001.onetakeda.com/v1
- Vue2/Vuetify2 版本: http://jptyomdmidd001.onetakeda.com/v2
- React/Bootstrap3 版本: http://jptyomdmidd001.onetakeda.com/v3

## API 代理

所有项目中的 API 请求 `http://jptyomdmidd001.onetakeda.com/chat` 将被 Nginx 代理到实际的后端服务。

## 构建生产版本

### Vue2_Vuetify2

```bash
cd Vue2_Vuetify2
npm run build
```

构建后的文件将位于 `dist` 目录，并配置了正确的基本路径 `/v2/`。

### React_Bootstrap3

```bash
cd React_Bootstrap3
npm run build
```

构建后的文件将位于 `build` 目录，并配置了正确的基本路径 `/v3/`。

## 故障排除

1. **无法访问网站**:
   - 确保 Nginx 正在运行
   - 检查 Nginx 错误日志: `/var/log/nginx/error.log`

2. **API 请求失败**:
   - 确保后端 API 服务正在运行
   - 检查 Nginx 配置中的代理设置
   - 查看浏览器开发者工具中的网络请求 