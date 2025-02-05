import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../lib/mongodb";
import User from "../../models/User";
import { verifyAPI } from "@/lib/auth";

export default async function handler(req: any, res: NextApiResponse) {
    await verifyAPI(req, res);

    await connectToDatabase();

    switch (req.method) {
        case "GET":
            res.status(200).json({
                message: "Login successful",
                data: req.user,
            })
            break;
            case "POST":
                post(req, res)
            break;
    
        default:
            return res.status(405).json({ message: "Method not allowed" });
            break;
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
