import type { NextApiRequest, NextApiResponse } from "next";
import { compare, hashSync } from "bcrypt-ts";
import { connectToDatabase } from "../../../lib/mongodb";
import User from "../../../models/User";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  await connectToDatabase();

  try {
    const existingUser = await User.findOne({ username })
    const isPasswordValid = await compare(password, existingUser.password)
    if (!existingUser || !isPasswordValid) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    res.status(200).json({
      message: "Login successful",
      data: { 
        id: existingUser._id, 
        username: existingUser.username 
      },
    })
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", error });
  }
}
