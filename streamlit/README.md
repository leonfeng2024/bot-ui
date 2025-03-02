# Streamlit Chatbot 界面

这是一个使用 Streamlit 构建的简单聊天机器人界面，专为 RHEL 7.9 系统设计。

## 项目设置

### 前提条件

- Python 3.6+ (RHEL 7.9 上推荐使用 Python 3.6)
- pip 包管理器

### 安装

1. 创建虚拟环境（推荐）:
```bash
python3 -m venv venv
source venv/bin/activate
```

2. 安装依赖:
```bash
pip install -r requirements.txt
```

3. 生成头像图片:
```bash
python generate_avatars.py
```

### 运行应用

启动 Streamlit 应用:
```bash
streamlit run app.py
```

默认情况下，应用将在 http://localhost:8501 上运行。

### 配置

应用默认连接到 `http://jptyomdmidd001.onetakeda.com/chat` API 端点。如果需要修改此设置，请编辑 `app.py` 文件中的 `send_message_to_api` 函数。

## 功能

- 响应式聊天界面
- 用户和机器人头像
- 消息历史记录
- 与后端 API 集成
- 支持回车键发送消息

## 部署到 RHEL 7.9

1. 按照上述步骤安装和配置应用

2. 如果需要在后台运行，可以使用 nohup 或 screen:
```bash
nohup streamlit run app.py &
```

3. 或者使用 systemd 创建服务（推荐用于生产环境）:
```
[Unit]
Description=Streamlit Chatbot Application
After=network.target

[Service]
User=your_user
WorkingDirectory=/path/to/streamlit
ExecStart=/path/to/venv/bin/streamlit run app.py
Restart=on-failure
RestartSec=5s

[Install]
WantedBy=multi-user.target
```

## 故障排除

如果遇到连接 API 的问题，请确保:

1. 后端 API 服务正在运行
2. 防火墙允许访问 API 端口
3. 检查 API URL 是否正确配置 