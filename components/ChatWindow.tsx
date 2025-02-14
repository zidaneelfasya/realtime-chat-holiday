import { FC, useEffect, useState } from "react";
import ChatInput from "./ChatInput";
import HeaderChat from "./HeaderChat";
import MessageBubble from "./MessageBubble";
import HELPER from "@/helpers/helper";

interface Message {
  _id: string;
  text: string;
  sender: string;
}

interface ChatWindowProps {
  selectedFriend: Friend | null;
}
const ChatWindow: FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await HELPER.Axios("GET", "/api/message");
        setMessages(res.data.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="flex-1 flex flex-col bg-gray-800 text-white rounded-3xl p-10">
      <HeaderChat name="Zidane" />
      <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>
      <div className="flex-1 p-4 overflow-y-auto">
        {loading ? (
          <p>Loading messages...</p>
        ) : messages.length > 0 ? (
          messages.map((msg) => (
            <MessageBubble key={msg._id} text={msg.text} sender={msg.sender} />
          ))
        ) : (
          <p>No messages yet</p>
        )}
      </div>
      <ChatInput setMessages={setMessages} />
    </div>
  );
};

export default ChatWindow;
