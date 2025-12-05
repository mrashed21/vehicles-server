import { Request, Response } from "express";
import { bookingService } from "./bookings.service";

// create booking controller
const createBooking = async (req: Request, res: Response) => {
  try {
    if (
      new Date(req.body.rent_end_date) <= new Date(req.body.rent_start_date)
    ) {
      return res.status(400).json({
        success: false,
        message: "End date must be after start date",
      });
    }

    if (req.body.total_price <= 0) {
      return res.status(400).json({
        success: false,
        message: "Price must be a positive number",
      });
    }

    const allowedStatus = ["active", "cancelled", "returned"];
    if (req.body.status && !allowedStatus.includes(req.body.status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking status",
      });
    }

    const result = await bookingService.createBooking(req.body);
    res.status(201).json({
      success: true,
      message: "Booking Created Successfully",
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

export const bookingController = {
  createBooking,
};
