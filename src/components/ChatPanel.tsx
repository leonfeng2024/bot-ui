import React, { useState, useRef } from 'react';
import { ChatRequest } from '../types/chat';

interface ChatPanelProps {
    onSubmit: (request: ChatRequest) => void;
    onFileUpload: (file: File) => void;
}

const ChatPanel: React.FC<ChatPanelProps> = ({ onSubmit, onFileUpload }) => {
    const [message, setMessage] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;

        const request: ChatRequest = {
            username: 'user',
            query: message.trim()
        };

        onSubmit(request);
        setMessage('');
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onFileUpload(file);
        }
    };

    return (
        <div className="border-t border-gray-200 bg-white p-4">
            <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
                <div className="flex items-end gap-4">
                    <div className="flex-1">
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type your message here..."
                            className="w-full resize-none rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
                            rows={1}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSubmit(e);
                                }
                            }}
                        />
                    </div>
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="rounded-lg border border-gray-300 p-3 hover:bg-gray-50"
                        >
                            📎
                        </button>
                        <button
                            type="submit"
                            className="rounded-lg bg-blue-600 px-4 py-3 text-white hover:bg-blue-700"
                            disabled={!message.trim()}
                        >
                            Submit
                        </button>
                    </div>
                </div>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                />
            </form>
        </div>
    );
};

export default ChatPanel; 