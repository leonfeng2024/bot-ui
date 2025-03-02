#!/bin/bash

echo "正在关停聊天机器人界面服务..."

# 关停 Streamlit 服务
echo "关停 Streamlit 服务..."
pkill -f "streamlit run app.py" || true
lsof -ti:8084 | xargs kill -9 2>/dev/null || true

echo "服务已关停！" 