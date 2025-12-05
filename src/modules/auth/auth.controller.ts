import { Request, Response } from "express";
import { authService } from "./auth.service";

// create user controller
const createUser = async (req: Request, res: Response) => {
  try {
    if (!req.body.password || req.body.password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }
    const result = await authService.createUser(req.body);
    res.status(201).json({
      success: true,
      message: "User Created Successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// login user controller

const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await authService.loginUser(
      req.body.email,
      req.body.password
    );

    res.status(200).json({
      success: true,
      message: "Login Successful",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
export const authController = {
  createUser,
  loginUser,
};
