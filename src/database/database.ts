import dotenv from "dotenv";
import path from "path";
import { Pool } from "pg";
import config from "../config";
dotenv.config({ path: path.join(process.cwd(), ".env") });
export const pool = new Pool({
  connectionString: `${config.connection_str}`,
});

export const initDB = async () => {
  await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(250) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        phone VARCHAR(20) NOT NULL,
        role VARCHAR(100) DEFAULT 'customer',
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
        )
        `);
  console.log("Database Connected");
};
