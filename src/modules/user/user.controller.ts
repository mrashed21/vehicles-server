import { Request, Response } from "express";
import { pool } from "../../database/database";
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

// update user by id
const updareUser = async (req: Request, res: Response) => {
  try {
    const loggedInUser = req.user!;
    const updateUserId = Number(req.params.userId);

    if (loggedInUser.role === "customer" && loggedInUser.id !== updateUserId) {
      return res.status(403).json({
        success: false,
        message: "Customers can only update their own profile",
      });
    }

    const payload: Record<string, unknown> = {
      name: req.body.name,
      phone: req.body.phone,
      password: req.body.password,
    };

    if (loggedInUser.role === "admin") {
      payload.role = req.body.role;
    }

    if (loggedInUser.role === "customer" && req.body.role) {
      return res.status(403).json({
        success: false,
        message: "You cant change role",
      });
    }

    const result = await userSerice.updareUser(updateUserId, payload);

    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
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

// delete user
const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);

    const activeBookings = await pool.query(
      `SELECT id FROM bookings WHERE customer_id = $1 AND status = 'active'`,
      [userId]
    );

    if (activeBookings.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Cannot delete user because they have active bookings.",
      });
    }

    const result = await userSerice.deleteUser(userId);

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
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
  updareUser,
  deleteUser,
};
