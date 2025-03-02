import React from 'react';
import './App.css';
import TopMenuBar from './components/TopMenuBar/TopMenuBar';
import ChatWindow from './components/ChatWindow/ChatWindow';

function App() {
  return (
    <div className="App">
      <TopMenuBar />
      <ChatWindow />
    </div>
  );
}

export default App;
