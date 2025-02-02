interface MessageProps {
  text: string;
  sender: string;
}

export default function MessageBubble({ text, sender }: MessageProps) {
  return (
    <div className="p-2 bg-gray-700 rounded-lg my-2">
      <p className="text-sm text-gray-300">{sender}</p>
      <p className="text-white">{text}</p>
    </div>
  );
}
