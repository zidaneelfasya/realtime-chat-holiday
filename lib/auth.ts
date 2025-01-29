import { jwtVerify } from "jose";
import { NextApiRequest, NextApiResponse } from "next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
export async function verifyAPI(req: any, res: NextApiResponse) {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: "Authorization header is missing" });
  }

  try {
    const token = authorization.split(" ")[1];
    const decode = await jwtVerify(token, secretKey); 
    req.user = decode 
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token", error });
  }
}
export function useAuthCheck() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const expiresAt = localStorage.getItem("expiresAt");

    if (!token || !expiresAt || Date.now() > Number(expiresAt)) {
      localStorage.removeItem("token");
      localStorage.removeItem("expiresAt");
      router.push("/login");
    } else {
      setIsChecking(false); 
    }
  }, [router]);

  return isChecking; 
}
