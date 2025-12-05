import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { pool } from "../database/database";
const secrect = config.secrect;

const auth = (...roles: ("admin" | "customer")[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(403).json({
        success: false,
        message: "Forbidden",
      });
    }
    const decoded = jwt.verify(token, secrect) as JwtPayload;
    const user = await pool.query(
      `
      SELECT * FROM users WHERE email=$1
      `,
      [decoded.email]
    );
    if (user.rows.length === 0) {
      throw new Error("User not found!");
    }
    req.user = decoded;
    if (roles.length && !roles.includes(decoded.role)) {
      return res.status(401).json({
        success: false,
        message: "Not authorized! Login again",
      });
    }
    next();
  };
};

export default auth;
