import { jwtVerify } from "jose";

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET || "!@#$%^&*()");

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secretKey)
    return payload
  } catch (error) {
    console.error("Invalid token:", error);
    throw new Error("Invalid or expired token")
  }
}
