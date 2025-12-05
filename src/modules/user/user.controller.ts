import { Request, Response } from "express";
import { userSerice } from "./user.service";

// get all user

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await userSerice.getAllUser();

    res.status(200).json({
      success: true,
      message: "Users get Successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
export const userController = {
  getAllUser,
};
