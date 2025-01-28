import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../lib/mongodb";
import User from "../../models/User";
import { jwtVerify } from "jose";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const secretKey = new TextEncoder().encode(process.env.JWT_SECRET || "!@#$%^&*()");

    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: "Authorization header is missing" });
    }

    try {
        const token = authorization.split(" ")[1];
        const decoded = await jwtVerify(token, secretKey)
    
        const { user_id, username } = req.body
    
        await connectToDatabase();
    
        switch (req.method) {
            case "GET":
                try {
                    let find = {}
                    if (user_id) find._id = user_id
                    if (username) find.username = username
                    const existingUser = await User.find(find)
    
                    res.status(200).json({
                        message: "Login successful",
                        data: existingUser,
                    })
                } catch (error) {
                    return res.status(500).json({ message: "Something went wrong", error });
                }
                break;
            case "POST":
                
                break;
        
            default:
                return res.status(405).json({ message: "Method not allowed" });
                break;
        }

    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token", error })   
    }

}
