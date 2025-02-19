
interface MessageProps {
  text: string;
  id_sender: string;
  sender: {
    _id: string;
    username: string;
  };
}
export default function MessageBubble({ text, sender, id_sender }: MessageProps) {
  const isSender = id_sender === sender._id;
  console.log(id_sender)
  return (
    <div
      className={`flex w-full ${
        isSender ? "justify-end" : "justify-start"
      } my-1`}
    >
      <div
        className={`p-3 rounded-lg max-w-[75%] break-words ${
          isSender
            ? "bg-blue-500 text-white self-end"
            : "bg-gray-700 text-white self-start"
        }`}
      >
        
        <p>{text}</p>
      </div>
    </div>
  );
}
