from fastapi import FastAPI, Request, BackgroundTasks
from fastapi.responses import JSONResponse
import logging
from datetime import datetime
import subprocess

app = FastAPI()

# 配置日志
logging.basicConfig(filename='webhook.log', level=logging.INFO, format='%(asctime)s %(levelname)s: %(message)s', datefmt='%Y-%m-%d %H:%M:%S')

def run_shell_script(tag):
    try:
        # 调用Shell脚本并传递tag作为参数
        result = subprocess.run(['./docker_commands.sh', tag], capture_output=True, text=True)
        
        if result.returncode != 0:
            logging.error(f"Shell script failed with error: {result.stderr}")
        else:
            logging.info(f"Shell script output: {result.stdout}")
    except Exception as e:
        logging.error(f"An error occurred while running shell script: {str(e)}")

def handle_webhook(json_data):
    push_data = json_data.get('push_data', {})
    tag = push_data.get('tag')
    logging.info(f"Tag '{tag}' matches. Proceeding with Docker operations.")
    run_shell_script(tag)


@app.post('/webhook')
async def webhook(request: Request, background_tasks: BackgroundTasks):
    try:
        # 获取当前时间
        current_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        
        # 记录请求的基本信息
        logging.info(f"Received a POST request at {current_time}")
        logging.info(f"Request headers: {request.headers}")
        
        # 获取并记录请求体中的JSON数据
        json_data = await request.json()
        logging.info(f"Request body: {json_data}")

        # 将handle_webhook添加到后台任务中
        background_tasks.add_task(handle_webhook, json_data)

        # 立即返回成功的响应消息给客户端
        response_message = {'status': 'success', 'message': 'Request received and processing in background'}
        return JSONResponse(content=response_message, status_code=200)
    except Exception as e:
        # 捕获任何异常并记录错误日志
        logging.error(f"An error occurred: {str(e)}")
        return JSONResponse(content={'status': 'failure', 'message': 'Internal Server Error'}, status_code=500)

if __name__ == '__main__':
    import uvicorn
    logging.info("Starting FastAPI server...")
    uvicorn.run(app, host='0.0.0.0', port=8080)