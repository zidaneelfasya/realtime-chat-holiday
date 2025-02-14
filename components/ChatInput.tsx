import { useState } from "react";
import HELPER from "@/helpers/helper";

interface ChatInputProps {
  setMessages: React.Dispatch<React.SetStateAction<{ _id: string; text: string; sender: string }[]>>;
}

export default function ChatInput({ setMessages }: ChatInputProps) {
  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    if (!message.trim()) return;

    try {
      const res = await HELPER.Axios("POST", "/api/message", {
        text: message,
        sender: "You", // Sesuaikan ini dengan sistem autentikasi user-mu
      });

      setMessages((prevMessages) => [...prevMessages, res.data.data]);
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="p-4 bg-gray-800 flex">
      <input
        type="text"
        className="w-full p-2 rounded bg-gray-800 text-white "
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage} className="ml-2 p-2 bg-blue-500 rounded">
        Send
      </button>
    </div>
  );
}
