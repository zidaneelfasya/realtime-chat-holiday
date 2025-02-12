import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../lib/mongodb";
import { verifyAPI } from "@/lib/auth";
import Friend from "@/models/Friend";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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
      return put(req, res);
      break;
    default:
      return res.status(405).json({ message: "Method not allowed" });
      break;
  }
}

const get = async (req: any, res: NextApiResponse) => {
  const { username } = req.body;
  const me = req.user.payload.id;

  try {
    const find = { user: me };

    const friends = await Friend.find({
      // $or: [{ user: me }, { friend: me }],
      $or: [{ friend: me }],
      status: "pending",
    })
      .populate({
        path: "user friend",
        select: "username _id",
      })
      .lean();

    const friendList = friends.map((friend) => ({
      _id: friend._id, // Mengembalikan ID friend request
      friend: friend.user._id.toString() === me ? friend.friend : friend.user,
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

const put = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.body;
  console.log(id);
  const me = req.user.payload.id;

  try {
    const friendRequest = await Friend.findOne({
      _id: id,
      friend: me,
      status: "pending",
    });

    if (!friendRequest) {
      return res.status(404).json({ message: "Friend request not found" });
    }

    friendRequest.status = "accepted";
    await friendRequest.save();

    res
      .status(200)
      .json({ message: "Friend request accepted", data: friendRequest });
    return res
      .status(200)
      .json({ message: "Friend request accepted", data: accept });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};
