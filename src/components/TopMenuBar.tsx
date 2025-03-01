import React from 'react';
import Image from 'next/image';

const TopMenuBar = () => {
    return (
        <div className="flex justify-between items-center px-4 py-2 bg-white border-b border-gray-200">
            <div className="flex items-center">
                <div className="text-2xl font-bold text-blue-600">
                    ChatBot
                </div>
            </div>
            <div className="w-10 h-10 rounded-full overflow-hidden">
                <Image
                    src="/user_icon.png"
                    alt="User Profile"
                    width={40}
                    height={40}
                    className="object-cover"
                />
            </div>
        </div>
    );
};

export default TopMenuBar; 