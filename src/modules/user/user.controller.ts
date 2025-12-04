import { Request, Response } from "express";
import { pool } from "../../database/database";

const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const result = await pool.query(
      `INSERT INTO users (name, email, password)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [name, email.toLowerCase(), password]
    );

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

export const userController = {
  createUser,
};
