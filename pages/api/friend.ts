import type { NextApiResponse } from "next";
import { connectToDatabase } from "../../lib/mongodb";
import { verifyAPI } from "@/lib/auth";
import Friend from "@/models/Friend";

export default async function handler(req: any, res: NextApiResponse) {
  await verifyAPI(req, res);

  await connectToDatabase();

  switch (req.method) {
    case "GET":
      get(req, res);
      break;
    case "POST":
      post(req, res);
      break;
    case "PUT":
      post(req, res);
      break;
    default:
      return res.status(405).json({ message: "Method not allowed" });
      break;
  }
}

const get = async (req: any, res: NextApiResponse) => {
  const me = req.user.payload.id;

  try {
    const friends = await Friend.find({
      $or: [
        { friend: me },
        {
          user: me,
        },
      ],
      status: "accepted",
    })
      .populate({
        path: "user friend",
        select: "username _id",
      })
      .lean();

    const friendList = friends.map((friend) => ({
      _id:
        friend.user._id.toString() === me ? friend.friend._id : friend.user._id,
      username:
        friend.user._id.toString() === me
          ? friend.friend.username
          : friend.user.username,
    }));

    return res.status(200).json({
      message: "Friends retrieved successfully",
      data: friendList,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

const post = async (req: any, res: NextApiResponse) => {
  const { user_id } = req.body;
  const me = req.user.payload.id;

  try {
    const existingFriend = await Friend.findOne({
      user: me,
      friend: user_id,
    });

    if (existingFriend) {
      return res.status(400).json({ message: "Friend request already sent" });
    }

    const newFriend = new Friend({
      user: me,
      friend: user_id,
      status: "pending", // Pastikan ini ada
    });

    // Simpan dan pastikan `status` diambil
    const savedFriend = await newFriend.save();

    return res.status(200).json({
      message: "Friend request sent successfully",
      friend: savedFriend,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

const put = async (req: any, res: NextApiResponse) => {
  const { status, id } = req.body;
  const me = req.user.payload.id;
  try {
    const accept = await Friend.findOneAndUpdate(
      {
        _id: id,
      },
      {
        status: status,
      }
    );
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};
