import React from 'react';
import ChatBox from '../components/ChatBox';

export default function ChatPage() {
  return (
    <div className="p-4 md:p-8 max-w-[1200px] mx-auto h-[calc(100vh-100px)]">
      <ChatBox />
    </div>
  );
}
