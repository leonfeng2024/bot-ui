# Streamlit 聊天机器人界面

这是一个使用 Streamlit 构建的简单聊天机器人界面，专为 RHEL 7.9 系统设计。该项目提供了一个简洁、易用的聊天界面，可以连接到后端 API 服务。

## 功能特点

- 响应式聊天界面，适配不同屏幕尺寸
- 用户和机器人头像显示
- 聊天历史记录保存（会话期间）
- 最新消息自动滚动到底部
- 支持回车键发送消息
- 与后端 API 集成 (http://localhost:8000/chat)
- 简单易用的安装和启动脚本

## 快速开始

### 方法 1: 使用自动脚本

1. 进入 streamlit 目录:
```bash
cd streamlit
```

2. 运行启动脚本:
```bash
./run.sh
```

3. 在浏览器中访问:
```
http://localhost:8501
```

### 方法 2: 手动安装和启动

1. 创建并激活虚拟环境:
```bash
cd streamlit
python3 -m venv venv
source venv/bin/activate
```

2. 安装依赖:
```bash
pip install -r requirements.txt
```

3. 生成头像:
```bash
python generate_avatars.py
```

4. 启动应用:
```bash
streamlit run app.py
```

## 项目结构

```
streamlit/
├── app.py                # 主应用程序文件
├── generate_avatars.py   # 头像生成脚本
├── requirements.txt      # 依赖项列表
├── run.sh                # 自动启动脚本
├── README.md             # 英文说明文档
├── README_CN.md          # 中文说明文档
├── QUICK_START.md        # 快速入门指南
├── user_avatar.png       # 用户头像
└── bot_avatar.png        # 机器人头像
```

## API 集成

应用默认连接到 `http://localhost:8000/chat` API 端点。API 请求格式为:

```json
{
  "username": "user",
  "query": "用户输入的消息"
}
```

预期的 API 响应格式为:

```json
{
  "status": "success",
  "message": "机器人的回复消息"
}
```

## 自定义

如需修改 API 端点或其他配置，请编辑 `app.py` 文件中的相关部分。

## 系统要求

- RHEL 7.9 或兼容系统
- Python 3.6+
- 网络连接（用于 API 调用）

## 故障排除

如果遇到问题，请参阅 `QUICK_START.md` 文件中的常见问题解决方案。 