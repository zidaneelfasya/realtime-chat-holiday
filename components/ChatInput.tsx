import { useState } from "react";

export default function ChatInput() {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    console.log("Sending:", message);
    setMessage("");
  };

  return (
    <div className="p-4 bg-gray-800">
      <input
        type="text"
        className="w-full p-2 rounded bg-gray-800 text-white"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage} className="mt-2 p-2 bg-blue-500 rounded">
        Send
      </button>
    </div>
  );
}
