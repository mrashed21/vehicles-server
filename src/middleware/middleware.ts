import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { pool } from "../database/database";
const secrect = config.secrect;

const auth = (...roles: ("admin" | "customer")[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(403).json({
        success: false,
        message: "Forbidden! No token provided",
      });
    }

    const token = authHeader.split(" ")[1] as string;

    try {
      const decoded = jwt.verify(token, secrect) as JwtPayload;

      const user = await pool.query(`SELECT * FROM users WHERE email=$1`, [
        decoded.email,
      ]);

      if (user.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      req.user = decoded;

      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(401).json({
          success: false,
          message: "Not authorized!",
        });
      }

      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token!",
      });
    }
  };
};

export default auth;
