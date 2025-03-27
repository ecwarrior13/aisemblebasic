import ChatInterface from "@/components/chat/ChatInterface";
import React from "react";

function AgentChat() {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Leftside */}
        <div className="flex flex-col gap-6 p-4 border border-gray-200 rounded-xl bg-white">
          Left side
          <ChatInterface />
        </div>
        <div className="lg:order-2 flex flex-col gap-4 p-4 border border-gray-200 rounded-xl bg-white">
          {/* Right Side */}
          Right Side
        </div>
      </div>
    </div>
  );
}

export default AgentChat;
