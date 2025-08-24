import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

interface AuthRequest extends Request {
  userId?: string;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ msg: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    throw new Error("Token not found");
  }

  const secretKey = process.env.JWT_SECRET;
  if (!secretKey) {
    throw new Error("JWT_SECRET not set in environment");
  }

  try {
    const decoded = jwt.verify(token, secretKey) as JwtPayload & { userId?: string };

    if (decoded.id) {
      req.userId = decoded.id;
      next();
    } else {
      res.status(403).json({ msg: "Invalid token payload " + decoded.id });
    }
  } catch (err) {
    res.status(403).json({ msg: "User not authenticated" });
  }
};