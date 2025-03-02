# 构建阶段
FROM crpi-5va2c7blqnzmwnnn.cn-beijing.personal.cr.aliyuncs.com/aacoe/local_platform:node18-alpine-amd as build

# 设置工作目录
WORKDIR /app

# 复制package.json和package-lock.json
COPY package.json package-lock.json ./

# 安装依赖 - 使用npm install替代npm ci，并确保安装react-scripts
RUN ["npm", "install"]

# 复制源代码
COPY . .

# 构建应用
RUN ["npm", "run", "build"]

# 部署阶段
FROM crpi-5va2c7blqnzmwnnn.cn-beijing.personal.cr.aliyuncs.com/aacoe/local_platform:nginx-alpine-amd

# 复制nginx配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 从构建阶段复制构建产物到nginx目录
COPY --from=build /app/build /usr/share/nginx/html

# 暴露80端口
EXPOSE 80

# 启动nginx
CMD ["nginx", "-g", "daemon off;"] 