import { pool } from "../../database/database";

// create user vehicle
const createVehicle = async (payload: Record<string, unknown>) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;

  const result = await pool.query(
    `INSERT INTO vehicles (vehicle_name, type, registration_number , daily_rent_price , availability_status)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
    ]
  );

  return result;
};

// get all vehicle

const getAllVehicle = async () => {
  const result = await pool.query(
    `SELECT id,vehicle_name,type,registration_number,daily_rent_price,availability_status FROM vehicles`
  );

  return result;
};

// get single vehicle

const getSingleVehicle = async (vehicleId: number) => {
  const result = await pool.query(
    `SELECT id,vehicle_name,type,registration_number,daily_rent_price,availability_status FROM vehicles WHERE id=$1`,
    [vehicleId]
  );

  return result;
};
export const vehicleService = {
  createVehicle,
  getAllVehicle,
  getSingleVehicle,
};
