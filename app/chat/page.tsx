"use client";

import ChatDetails from "@/components/ChatDetails";
import ChatWindow from "@/components/ChatWindow";
import Sidebar from "@/components/ChatSidebar";

export default function ChatPage() {
  return (
    <div className="flex h-screen bg-gray-900">
      <Sidebar />
      <ChatWindow />
      <ChatDetails />
    </div>
  );
}
