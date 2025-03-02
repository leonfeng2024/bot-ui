#!/bin/bash

# 确保脚本在错误时停止
set -e

echo "启动聊天机器人界面服务..."

# Streamlit 项目
echo "启动 Streamlit 项目..."
cd streamlit
# 激活虚拟环境
source venv/bin/activate
# 检查是否安装了streamlit
if ! command -v streamlit &> /dev/null; then
    echo "在虚拟环境中安装 Streamlit..."
    pip install streamlit
fi
streamlit run app.py --server.port 8084 &
echo "Streamlit 服务已启动在端口 8084"
# 退出虚拟环境
deactivate
cd ..

echo "服务已启动！"
echo "访问 http://localhost/v1 - Html_Js_Css 项目 (静态文件)"
echo "访问 http://localhost/v2 - Vue2_Vuetify2 项目 (静态文件)"
echo "访问 http://localhost/v3 - React_Bootstrap3 项目 (静态文件)"
echo "访问 http://localhost/v4 - Streamlit 项目"
echo "访问 http://localhost/v5 - Ant_Design_X 项目 (静态文件)"
echo "访问 http://localhost/v6 - React_Typescript 项目 (静态文件)" 