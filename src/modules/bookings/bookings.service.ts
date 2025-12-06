import { pool } from "../../database/database";

// create booking service

const createBooking = async (payload: Record<string, any>) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

  const vehicleResult = await pool.query(
    `SELECT vehicle_name, daily_rent_price, availability_status
     FROM vehicles WHERE id=$1`,
    [vehicle_id]
  );

  if (vehicleResult.rows.length === 0) {
    throw new Error("Vehicle not found");
  }

  const vehicle = vehicleResult.rows[0];

  if (vehicle.availability_status === "booked") {
    throw new Error("Vehicle is already booked");
  }

  const start = new Date(rent_start_date);
  const end = new Date(rent_end_date);

  const msDiff = end.getTime() - start.getTime();
  const days = Math.max(1, Math.ceil(msDiff / (1000 * 60 * 60 * 24)));

  const total_price = days * vehicle.daily_rent_price;

  const bookingResult = await pool.query(
    `
    INSERT INTO bookings (
      customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status
    )
    VALUES ($1, $2, $3, $4, $5, 'active')
    RETURNING 
      id,
      customer_id,
      vehicle_id,
      rent_start_date::text,
      rent_end_date::text,
      total_price,
      status
  `,
    [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price]
  );

  const booking = bookingResult.rows[0];

  await pool.query(
    `UPDATE vehicles SET availability_status='booked' WHERE id=$1`,
    [vehicle_id]
  );

  booking.vehicle = {
    vehicle_name: vehicle.vehicle_name,
    daily_rent_price: vehicle.daily_rent_price,
  };

  return booking;
};

const getBookings = async (user: any) => {
  let query = `
    SELECT b.*, 
      v.vehicle_name, 
      v.daily_rent_price
    FROM bookings b
    JOIN vehicles v ON b.vehicle_id = v.id
  `;

  let params: any[] = [];

  if (user.role === "customer") {
    query += " WHERE b.customer_id = $1";
    params.push(user.id);
  }

  const result = await pool.query(query, params);

  return result.rows;
};

const updateBooking = async (bookingId: number, status: string, user: any) => {
  const bookingResult = await pool.query(`SELECT * FROM bookings WHERE id=$1`, [
    bookingId,
  ]);

  if (bookingResult.rows.length === 0) {
    throw new Error("Booking not found");
  }

  const booking = bookingResult.rows[0];
  if (user.role === "customer") {
    if (user.id !== booking.customer_id) {
      throw new Error("Customers can update only their own bookings");
    }

    const today = new Date();
    const start = new Date(booking.rent_start_date);

    if (today >= start) {
      throw new Error("You cannot cancel after the start date");
    }

    if (status !== "cancelled") {
      throw new Error("Customers can only cancel their bookings");
    }
  }

  if (status === "cancelled" || status === "returned") {
    await pool.query(
      `UPDATE vehicles SET availability_status = 'available' WHERE id = $1`,
      [booking.vehicle_id]
    );
  }
  const updatedBooking = await pool.query(
    `UPDATE bookings SET status=$1 WHERE id=$2 RETURNING *`,
    [status, bookingId]
  );

  return updatedBooking.rows[0];
};

export const bookingService = {
  createBooking,
  getBookings,
  updateBooking,
};
