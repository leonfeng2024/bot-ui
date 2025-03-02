import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ChatBot from './ChatBot';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ChatBot />
  </React.StrictMode>
); 