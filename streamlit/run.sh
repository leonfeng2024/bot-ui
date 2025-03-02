#!/bin/bash

# 确保脚本在出错时退出
set -e

# 检查 Python 是否安装
if ! command -v python3 &> /dev/null; then
    echo "错误: 未找到 Python3。请安装 Python3 后再试。"
    exit 1
fi

# 检查虚拟环境是否存在，如果不存在则创建
if [ ! -d "venv" ]; then
    echo "创建虚拟环境..."
    python3 -m venv venv
fi

# 激活虚拟环境
echo "激活虚拟环境..."
source venv/bin/activate

# 安装依赖
echo "安装依赖..."
pip install -r requirements.txt

# 生成头像
echo "生成头像..."
python generate_avatars.py

# 运行应用
echo "启动 Streamlit 应用..."
streamlit run app.py

# 脚本结束时停用虚拟环境
deactivate 