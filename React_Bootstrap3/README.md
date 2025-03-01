# React + Bootstrap 3 Chatbot Interface

A simple chatbot interface built with React and Bootstrap 3, designed to work with Node.js 16.x on RHEL 7.9.

## Project Setup

### Prerequisites

- Node.js 16.x (tested with 16.20.0)
- npm 8.x or higher

### Installation

1. Install dependencies:
```
npm install
```

2. Create a `.env` file in the project root (optional):
```
REACT_APP_API_URL=http://your-backend-api-url
```

### Development

Start the development server:
```
npm start
```

### Production Build

Build for production:
```
npm run build
```

The built files will be in the `build` directory, which can be served by any static file server.

### Deployment on RHEL 7.9

1. Build the project on your development machine:
```
npm run build
```

2. Transfer the contents of the `build` directory to your RHEL 7.9 server.

3. Serve the static files using a web server like Apache or Nginx.

Example Nginx configuration:
```
server {
    listen 80;
    server_name your-domain.com;

    root /path/to/build;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Proxy API requests to your backend
    location /api {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## Features

- Clean, responsive UI built with Bootstrap 3
- Real-time chat interface
- API integration with backend services
- Message formatting for links and line breaks
- Loading indicators for API calls

## Compatibility Notes

This project uses:
- React 16 (compatible with Node.js 16)
- Bootstrap 3.4.1 (the last version of Bootstrap 3)
- React-Bootstrap 1.6.6 (compatible with Bootstrap 3)
- React Scripts 4.0.3 (the last version compatible with Node.js 16)

These versions were specifically chosen for compatibility with Node.js 16.x on RHEL 7.9. 