import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../lib/mongodb";
import { verifyAPI } from "@/lib/auth";
import Message from "@/models/Message";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await verifyAPI(req, res);
  await connectToDatabase();

  switch (req.method) {
    case "GET":
      return getMessages(req, res);
    case "POST":
      return sendMessage(req, res);
    case "PUT":
      return updateMessageStatus(req, res);
    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}

// **Mendapatkan daftar pesan antara dua pengguna**
const getMessages = async (req: NextApiRequest, res: NextApiResponse) => {
  const me = req.user.payload.id;
  const { receiver } = req.query;

  try {
    const messages = await Message.find({
      $or: [
        { sender: me, receiver },
        { sender: receiver, receiver: me },
      ],
    })
      .sort({ createdAt: 1 })
      .lean();

    return res.status(200).json({
      message: "Messages retrieved successfully",
      data: messages,
    });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

// **Mengirim pesan**
const sendMessage = async (req: NextApiRequest, res: NextApiResponse) => {
  const { receiver, content } = req.body;
  const me = req.user.payload.id;

  try {
    const newMessage = new Message({
      sender: me,
      receiver,
      content,
      status: "sent",
    });

    await newMessage.save();

    return res.status(201).json({
      message: "Message sent successfully",
      data: newMessage,
    });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

// **Memperbarui status pesan (delivered / read)**
const updateMessageStatus = async (req: NextApiRequest, res: NextApiResponse) => {
  const { messageId, status } = req.body;
  const me = req.user.payload.id;

  if (!["delivered", "read"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  try {
    const message = await Message.findOne({ _id: messageId, receiver: me });

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    message.status = status;
    await message.save();

    return res.status(200).json({ message: "Message status updated", data: message });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};
