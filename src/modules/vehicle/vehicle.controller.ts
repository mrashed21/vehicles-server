import { Request, Response } from "express";
import { vehicleService } from "./vehicle.service";

// create vehicle controller
const createVehicle = async (req: Request, res: Response) => {
  try {
    const validTypes = ["car", "bike", "van", "SUV"];
    if (!validTypes.includes(req.body.type)) {
      return res.status(400).json({
        success: false,
        message: "Invalid vehicle type",
      });
    }

    if (req.body.daily_rent_price <= 0) {
      return res.status(400).json({
        success: false,
        message: "Rent must be a positive number",
      });
    }
    const availabilityStatus = ["available", "booked"];
    if (!availabilityStatus.includes(req.body.availability_status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid availability status",
      });
    }

    const result = await vehicleService.createVehicle(req.body);
    res.status(201).json({
      success: true,
      message: "Vehicle created successfully",
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

export const vehicleController = {
  createVehicle,
};
