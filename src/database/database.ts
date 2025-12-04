import dotenv from "dotenv";
import path from "path";
import { Pool } from "pg";
dotenv.config({ path: path.join(process.cwd(), ".env") });
export const pool = new Pool({
  connectionString: `${process.env.CONNECTION_STR}`,
});

export const initDB = async () => {
  await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(250) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        phone INT,
        role VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
        )
        `);
  console.log("Database Connected");
};
