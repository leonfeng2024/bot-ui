#!/bin/bash

echo "正在关停所有聊天机器人界面服务..."

# 关停 Html_Js_Css 的 Python HTTP 服务器
echo "关停 Html_Js_Css 服务..."
pkill -f "python3 -m http.server 8081" || true

# 关停 Vue2_Vuetify2 服务
echo "关停 Vue2_Vuetify2 服务..."
lsof -ti:8082 | xargs kill -9 2>/dev/null || true

# 关停 React_Bootstrap3 服务
echo "关停 React_Bootstrap3 服务..."
lsof -ti:8083 | xargs kill -9 2>/dev/null || true

# 关停 Streamlit 服务
echo "关停 Streamlit 服务..."
pkill -f "streamlit run app.py" || true
lsof -ti:8084 | xargs kill -9 2>/dev/null || true

# 关停 Ant_Design_X 服务
echo "关停 Ant_Design_X 服务..."
lsof -ti:8085 | xargs kill -9 2>/dev/null || true

lsof -ti:8086 | xargs kill -9 2>/dev/null || true
lsof -ti:8087 | xargs kill -9 2>/dev/null || true

echo "所有服务已关停！" 