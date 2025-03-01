#!/bin/bash

# 确保脚本在错误时停止
set -e

echo "启动所有聊天机器人界面服务..."

# 项目1: Html_Js_Css (静态文件)
echo "配置 Html_Js_Css 项目..."
# 由于这是静态文件，我们可以使用简单的 HTTP 服务器
cd Html_Js_Css
python3 -m http.server 8081 &
echo "Html_Js_Css 服务已启动在端口 8081"
cd ..

# 项目2: Vue2_Vuetify2
echo "启动 Vue2_Vuetify2 项目..."
cd Vue2_Vuetify2
# 设置端口为 8082
export PORT=8082
npm run serve &
echo "Vue2_Vuetify2 服务已启动在端口 8082"
cd ..

# 项目3: React_Bootstrap3
echo "启动 React_Bootstrap3 项目..."
cd React_Bootstrap3
# 设置端口为 8083
export PORT=8083
npm start &
echo "React_Bootstrap3 服务已启动在端口 8083"
cd ..

echo "所有服务已启动！"
echo "访问 http://bot-ui/v1 - Html_Js_Css 项目"
echo "访问 http://bot-ui/v2 - Vue2_Vuetify2 项目"
echo "访问 http://bot-ui/v3 - React_Bootstrap3 项目" 