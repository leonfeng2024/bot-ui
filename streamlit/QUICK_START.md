# Streamlit Chatbot 快速启动指南

## 快速启动（RHEL 7.9）

1. 确保已安装 Python 3.6+:
```bash
python3 --version
```

2. 如果未安装 Python，请使用以下命令安装:
```bash
# 启用 EPEL 仓库
sudo yum install -y epel-release

# 安装 Python 3.6
sudo yum install -y python36 python36-devel python36-pip
```

3. 运行启动脚本:
```bash
cd streamlit
./run.sh
```

4. 在浏览器中访问应用:
```
http://localhost:8501
```

## 手动启动

如果自动脚本不起作用，可以按照以下步骤手动启动:

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

## 常见问题

### 问题: 无法连接到后端 API

确保后端 API 服务正在运行，并且可以访问 `http://localhost:8000/chat`。

### 问题: 安装依赖时出错

如果在安装依赖时遇到问题，可以尝试:
```bash
pip install --upgrade pip
pip install -r requirements.txt
```

### 问题: 无法创建虚拟环境

确保已安装 venv 模块:
```bash
sudo yum install -y python36-venv
```

### 问题: Streamlit 无法启动

检查是否已正确安装 Streamlit:
```bash
pip show streamlit
```

如果未安装，请尝试:
```bash
pip install streamlit==1.22.0
``` 