import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../lib/mongodb";
import User from "../../models/User";
import { verifyAPI } from "@/lib/auth";
import { Types } from "mongoose"; 

export default async function handler(req: any, res: NextApiResponse) {
    await verifyAPI(req, res);

    await connectToDatabase();

    switch (req.method) {
        case "GET":
            get(req,res)
            break;
            case "POST":
                post(req, res)
            break;
    
        default:
            return res.status(405).json({ message: "Method not allowed" });
            break;
    }
}

const get = async (req, res) => {
    const { user_id, username } = req.query;
    const me = new Types.ObjectId(req.user.payload.id);
    try {
        let find: any = { _id: { $ne: me } }
        if (username) find.username = { $regex: username, $options: "i" }

        const existingUser = await User.aggregate([
            { $match: find },
            {
                $lookup: {
                    from: "friends",
                    let: { userId: "$_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $or: [
                                        { $and: [{ $eq: ["$user", me] }, { $eq: ["$friend", "$$userId"] }] },
                                        { $and: [{ $eq: ["$user", "$$userId"] }, { $eq: ["$friend", me] }] },
                                    ],
                                },
                            },
                        },
                    ],
                    as: "friendship",
                },
            },
            {
                $addFields: {
                    friendStatus: {
                        $cond: {
                            if: { $gt: [{ $size: "$friendship" }, 0] },
                            then: { $arrayElemAt: ["$friendship.status", 0] },
                            else: null,
                        },
                    },
                },
            },
            {
                $project: {
                    _id: 1,
                    username: 1,
                    friendStatus: 1,
                },
            },
        ]);

        res.status(200).json({
            message: "Requested data found",
            data: existingUser,
        })

    } catch (error) {
        return res.status(500).json({ message: "Something went wrong", error: error.message });
    }
}

const post = async (req, res) => {
    const { user_id, username } = req.body
    try {
        let find: any = { _id: { $ne: req.user.payload.id } }
        if (username) find.username = { $regex: username, $options: "i" }

        const existingUser = await User.find(find).select("_id username")

        res.status(200).json({
            message: "Requested data found",
            data: existingUser,
        })
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong", error });
    }
}
