import { pool } from "../../database/database";

// gel all user by admin
const getAllUser = async () => {
  const result = await pool.query(`SELECT id,name,email,phone,role FROM users`);
  return result;
};

// user update id
const updareUser = async (userId: number, payload: Record<string, unknown>) => {
  const { name, phone, password, role } = payload;

  const result = await pool.query(
    `UPDATE users SET  name = COALESCE($1, name), phone = COALESCE($2, phone), password = COALESCE($3, password),role = COALESCE($4, role) WHERE id = $5 RETURNING id, name, email, phone, role
    `,
    [name, phone, password, role, userId]
  );

  return result;
};

// delete user
const deleteUser = async (userId: number) => {
  const result = await pool.query(`DELETE FROM users WHERE id = $1`, [userId]);

  return result;
};

export const userSerice = {
  getAllUser,
  updareUser,
  deleteUser,
};
