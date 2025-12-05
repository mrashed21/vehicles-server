import { pool } from "../../database/database";

// gel all user by admin
const getAllUser = async () => {
  const result = await pool.query(`SELECT id,name,email,phone,role FROM Users`);
  return result;
};

// user update id
const updareUser = async (userId: number, payload: Record<string, unknown>) => {
  const { name, phone, password, role } = payload;

  const result = await pool.query(
    `UPDATE Users SET  name = COALESCE($1, name), phone = COALESCE($2, phone), password = COALESCE($3, password),role = COALESCE($4, role) WHERE id = $5 RETURNING id, name, email, phone, role
    `,
    [name, phone, password, role, userId]
  );

  return result;
};

export const userSerice = {
  getAllUser,
  updareUser,
};
