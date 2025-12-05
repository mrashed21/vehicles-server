import dotenv from "dotenv";
import path from "path";
import { Pool } from "pg";
import config from "../config";
dotenv.config({ path: path.join(process.cwd(), ".env") });
export const pool = new Pool({
  connectionString: `${config.connection_str}`,
});

export const initDB = async () => {
  //? user data table
  await pool.query(`
        CREATE TABLE IF NOT EXISTS Users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(250) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        phone VARCHAR(20) NOT NULL,
        role VARCHAR(100) DEFAULT 'customer'
        )`);

  //? vehicle data table

  await pool.query(`
        CREATE TABLE IF NOT EXISTS Vehicles(
        id SERIAL PRIMARY KEY,
        vehicle_name VARCHAR(200) NOT NULL,
        type VARCHAR(20) NOT NULL CHECK (type IN ('car', 'bike', 'van', 'SUV')),
        registration_number VARCHAR(150) UNIQUE NOT NULL,
        daily_rent_price INT NOT NULL,
        availability_status VARCHAR(20) NOT NULL DEFAULT 'available'
        )`);

  //? booking data table
  await pool.query(`
        CREATE TABLE IF NOT EXISTS Bookings(
        id SERIAL PRIMARY KEY,
        customer_id INT REFERENCES Users(id) ON DELETE CASCADE NOT NULL,
        vehicle_id INT REFERENCES Vehicles(id) ON DELETE CASCADE NOT NULL,
        rent_start_date DATE NOT NULL,
        rent_end_date DATE NOT NULL,
        total_price INT NOT NULL,
        status VARCHAR(20) NOT NULL DEFAULT 'active')`);
  console.log("Database Connected");
};
