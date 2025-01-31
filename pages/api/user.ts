import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../lib/mongodb";
import User from "../../models/User";
import { verifyAPI } from "@/lib/auth";

export default async function handler(req: any, res: NextApiResponse) {
    await verifyAPI(req, res);
    
    const { user_id, username } = req.body
    
    await connectToDatabase();

    switch (req.method) {
        case "GET":
            try {
                let find: { _id?: any; username?: any } = {};
                if (user_id) find._id = user_id
                if (username) find.username = username
                const existingUser = await User.find(find)

                res.status(200).json({
                    message: "Requested data found",
                    data: existingUser,
                })
            } catch (error) {
                return res.status(500).json({ message: "Something went wrong", error });
            }
            break;
            case "POST":
                res.status(200).json({
                    message: "Login successful",
                    data: req.user,
                })
            break;
    
        default:
            return res.status(405).json({ message: "Method not allowed" });
            break;
    }
}
