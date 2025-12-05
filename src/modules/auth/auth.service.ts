import bcrypt from "bcryptjs";
import { pool } from "../../database/database";

const createUser = async (payload: Record<string, unknown>) => {
  const { name, email, password, phone, role } = payload;

  const hashPassword = await bcrypt.hash(password as string, 12);

  const result = await pool.query(
    `INSERT INTO users (name, email, password , phone , role)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
    [name, (email as string).toLowerCase(), hashPassword, phone, role]
  );

  delete result.rows[0].password;

  return result;
};

export const authService = {
  createUser,
};
