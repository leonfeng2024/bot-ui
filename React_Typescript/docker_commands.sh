#!/bin/bash

# 设置日志文件路径
LOG_FILE="shell.log"

# 重定向所有输出（包括错误输出）到日志文件
exec > >(tee -a ${LOG_FILE}) 2>&1

# Docker login credentials
USERNAME="leon.feng@1469413496072330"
PASSWORD="libra#2024"
REGISTRY="crpi-5va2c7blqnzmwnnn.cn-beijing.personal.cr.aliyuncs.com"

# Function to check and handle port 80 usage
check_port_80() {
    if lsof -i :80 >/dev/null 2>&1; then
        echo "Port 80 is in use. Checking for other Docker containers..."
        # 查找使用80端口的容器
        container_id=$(docker ps -q --filter publish=80)
        if [ ! -z "$container_id" ]; then
            echo "Found Docker container using port 80. Stopping it..."
            docker stop $container_id
            docker rm $container_id
        else
            echo "Port 80 is in use by a non-Docker process. Please free up port 80 first."
            exit 1
        fi
    fi
}

# Function to execute Docker commands
run_docker_commands() {
    local tag=$1

    # Docker login
    echo "Logging in to Docker registry..."
    echo "$PASSWORD" | docker login --username="$USERNAME" --password-stdin "$REGISTRY"
    if [ $? -ne 0 ]; then
        echo "Failed to login to Docker registry."
        exit 1
    fi

    # Stop and remove the container (ignore errors if container does not exist)
    echo "Stopping and removing existing container if it exists..."
    docker stop "$tag" || true
    docker rm "$tag" || true

    # Remove the image (ignore errors if image does not exist)
    echo "Removing existing image if it exists..."
    docker rmi "$REGISTRY/aacoe/local_platform:$tag" || true

    # Pull the new image with the specific tag
    echo "Pulling new image..."
    docker pull "$REGISTRY/aacoe/local_platform:$tag"
    if [ $? -ne 0 ]; then
        echo "Failed to pull Docker image."
        exit 1
    fi

    # Check port 80 before running new container
    # check_port_80

    # Run the new container with the specific tag
    echo "Starting new container..."
    docker run -d --name "$tag" -p 80:80 "$REGISTRY/aacoe/local_platform:$tag"
    if [ $? -ne 0 ]; then
        echo "Failed to run Docker container."
        exit 1
    fi

    echo "Container started successfully!"
}

# Check if a tag is provided as an argument
if [ -z "$1" ]; then
    echo "No tag provided."
    exit 1
fi

# Execute Docker commands with the provided tag
run_docker_commands "$1"