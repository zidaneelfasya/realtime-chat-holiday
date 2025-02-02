import ChatInput from "./ChatInput";
import HeaderChat from "./HeaderChat";
import MessageBubble from "./MessageBubble";

export default function ChatWindow() {
  return (
    
    <div className="flex-1 flex flex-col bg-gray-800 text-white rounded-3xl p-10">
      <HeaderChat name="Zidane"/>
      <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>
      <div className="flex-1 p-4 overflow-y-auto">
        {/* Tampilkan pesan di sini */}
        <MessageBubble text="Hello, how are you?" sender="Alice" />
        <MessageBubble text="I'm good, thanks!" sender="Bob" />
      </div>
      <ChatInput />
    </div>
  );
}
