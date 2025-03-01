'use client';

import React, { useState, useEffect } from 'react';
import TopMenuBar from '../components/TopMenuBar';
import ChatWindow from '../components/ChatWindow';
import ChatPanel from '../components/ChatPanel';
import { ChatMessage, ChatRequest, ChatResponse } from '../types/chat';

export default function Home() {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // Initial welcome message
    useEffect(() => {
        setMessages([
            {
                username: 'bot',
                message: 'Hello! How can I help you today?',
                status: 'success'
            }
        ]);
    }, []);

    const handleSubmit = async (request: ChatRequest) => {
        if (isLoading) return;

        // Add user message to chat
        const userMessage: ChatMessage = {
            username: 'user',
            message: request.query
        };
        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:8000/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request),
            });

            const data: ChatResponse = await response.json();
            
            const botMessage: ChatMessage = {
                username: data.username,
                message: data.message,
                status: data.status
            };
            
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            const errorMessage: ChatMessage = {
                username: 'bot',
                message: 'Sorry, there was an error processing your request.',
                status: 'failed'
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFileUpload = (file: File) => {
        // TODO: Implement file upload functionality
        console.log('File uploaded:', file.name);
    };

    return (
        <div className="flex flex-col h-screen bg-gray-50">
            <TopMenuBar />
            <main className="flex-1 flex flex-col">
                <ChatWindow messages={messages} />
                <ChatPanel 
                    onSubmit={handleSubmit} 
                    onFileUpload={handleFileUpload} 
                />
            </main>
        </div>
    );
} 