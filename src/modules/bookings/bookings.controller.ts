import { Request, Response } from "express";
import { bookingService } from "./bookings.service";

const createBooking = async (req: Request, res: Response) => {
  try {
    const { customer_id, vehicle_id, rent_start_date, rent_end_date } =
      req.body;

    if (new Date(rent_end_date) <= new Date(rent_start_date)) {
      return res.status(400).json({
        success: false,
        message: "End date must be after start date",
      });
    }
    const result = await bookingService.createBooking({
      customer_id,
      vehicle_id,
      rent_start_date,
      rent_end_date,
    });

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const getBookings = async (req: Request, res: Response) => {
  try {
    const loggedInUser = req.user!;

    const result = await bookingService.getBookings(loggedInUser);

    res.status(200).json({
      success: true,
      message: "Bookings retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const updateBooking = async (req: Request, res: Response) => {
  try {
    const loggedInUser = req.user!;
    const bookingId = Number(req.params.bookingId);
    const { status } = req.body;

    const allowed = ["active", "cancelled", "returned"];
    if (!allowed.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const result = await bookingService.updateBooking(
      bookingId,
      status,
      loggedInUser
    );

    res.status(200).json({
      success: true,
      message: "Booking updated successfully",
      data: result,
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
  getBookings,
  updateBooking,
};
