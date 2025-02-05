import type { NextApiResponse } from "next";
import { connectToDatabase } from "../../lib/mongodb";
import { verifyAPI } from "@/lib/auth";
import Friend from "@/models/Friend";

export default async function handler(req: any, res: NextApiResponse) {
    await verifyAPI(req, res);

    await connectToDatabase();

    switch (req.method) {
        case "GET":
                get(req, res)
            break;
        case "POST":
                post(req, res)
            break;
        default:
                return res.status(405).json({ message: "Method not allowed" });
            break;
    }
}

const get = async (req: any, res: NextApiResponse) => {
    const { username } = req.body
    const me = req.user.payload.id

    try {
        const find = { user: me }

        const existingFriend = await Friend.find(find).populate({
            path: "friend",
            select: "username _id",
            match: username ? { username: { $regex: username, $options: "i" } } : {}
        }).select("friend _id");

        const filteredFriends = existingFriend.filter(f => f.friend !== null);

        res.status(200).json({
            message: "Requested data found",
            data: filteredFriends,
        })
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong", error: error.message });
    }
}

const post = async (req: any, res: NextApiResponse) => {
    const { user_id } = req.body
    const me = req.user.payload.id

    try {
        const existingFriend = await Friend.findOne({
            user: me,
            friend: user_id
        });

        if (existingFriend) {
            return res.status(400).json({ message: "Friend request already sent" });
        }

        const newFriend = new Friend({
            user: me,
            friend: user_id,
        });

        await newFriend.save();

        return res.status(200).json({ message: "Friend request sent successfully", friend: newFriend });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong", error: error.message });
    }
}