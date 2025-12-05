import bcrypt from "bcryptjs";
import { pool } from "../../database/database";

const getAllUser = async () => {
  
  const result = await pool.query(
    `SELECT id,name,email,phone,role FROM Users`
  );

  return result;
};

export const userSerice = {
  getAllUser,
};
