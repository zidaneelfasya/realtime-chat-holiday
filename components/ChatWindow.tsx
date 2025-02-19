import { FC, useEffect, useState } from "react";
import ChatInput from "./ChatInput";
import HeaderChat from "./HeaderChat";
import MessageBubble from "./MessageBubble";
import HELPER from "@/helpers/helper";
import { getCookie } from "cookies-next";

interface Message {
  _id: string;
  
  content: string; 
  sender: {
    _id: string;
    username: string;
  };
  createdAt: string;
}

interface ChatWindowProps {
  selectedFriend: Friend | null;
}

const ChatWindow: FC<ChatWindowProps> = ({ selectedFriend }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);


  const[userId, seUserId] = useState("");
  useEffect(()=>{
    const idUser = getCookie("idUser");
    seUserId(idUser);
  }
  
  )

  useEffect(() => {
    if (!selectedFriend) return;

    const fetchMessages = async () => {
      setLoading(true);
      try {
        const res = await HELPER.Axios("GET", `/api/message?receiver=${selectedFriend._id}`);
        setMessages(res.data.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [selectedFriend, userId]); // Akan berjalan setiap kali selectedFriend berubah

  return (
    <div className="flex-1 flex flex-col bg-gray-800 text-white rounded-3xl p-10">
      <HeaderChat name={selectedFriend?.username || "Chat"} />
      <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />
      <div className="flex-1 p-4 ">
        {loading ? (
          <p>Loading messages...</p>
        ) : messages.length > 0 ? (
          messages.map((msg) => (
            <MessageBubble key={msg._id} text={msg.content} id_sender={userId} sender={msg.sender} />
          ))
        ) : (
          <p>No messages yet</p>
        )}
      </div>
      <ChatInput setMessages={setMessages} selectedFriend={selectedFriend} />
    </div>
  );
};

export default ChatWindow;
