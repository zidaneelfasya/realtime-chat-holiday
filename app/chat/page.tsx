"use client";

import { useEffect, useState } from "react";
import ChatWindow from "@/components/ChatWindow";
import ChatSidebar from "@/components/ChatSidebar";
import HELPER from "@/helpers/helper";

interface Friend {
  _id: string;
  username: string;
}

export default function ChatPage() {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);

  useEffect(() => {
    const fetchFriends = async () => {
      setLoading(true);
      try {
        const res = await HELPER.Axios("GET", "/api/friend");
        setFriends(res.data.data);
      } catch (error) {
        console.error("Error fetching friends:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, []);

  return (
    <div className="flex h-screen bg-gray-900">
      <ChatSidebar
        friends={friends}
        loading={loading}
        onSelectFriend={setSelectedFriend}
      />

      <ChatWindow selectedFriend={selectedFriend} />
    </div>
  );
}
