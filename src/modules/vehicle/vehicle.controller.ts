import { Request, Response } from "express";
import { pool } from "../../database/database";
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

// get all vehicle
const getAllVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehicleService.getAllVehicle();
    if (result.rows.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No vehicles found",
        data: [],
      });
    }
    return res.status(200).json({
      success: true,
      message: "Vehicles retrieved successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// get single vehicle
const getSingleVehicle = async (req: Request, res: Response) => {
  try {
    const vehicleId = Number(req.params.vehicleId);
    const result = await vehicleService.getSingleVehicle(vehicleId);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No data Found",
        data: result.rows,
      });
    }
    return res.status(200).json({
      success: true,
      message: "Vehicle retrieved successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// update single vehicle
const updateSingleVehicle = async (req: Request, res: Response) => {
  try {
    const validTypes = ["car", "bike", "van", "SUV"];
    if (req.body.type && !validTypes.includes(req.body.type)) {
      return res.status(400).json({
        success: false,
        message: "Invalid vehicle type",
      });
    }

    if (req.body.daily_rent_price && req.body.daily_rent_price <= 0) {
      return res.status(400).json({
        success: false,
        message: "Rent must be a positive number",
      });
    }
    const availabilityStatus = ["available", "booked"];
    if (
      req.body.availability_status &&
      !availabilityStatus.includes(req.body.availability_status)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid availability status",
      });
    }

    const vehicleId = Number(req.params.vehicleId);
    const result = await vehicleService.updateSingleVehicle(
      vehicleId,
      req.body
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "No data Found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Vehicle updated successfully",
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

// delete single vehicle
const deleteSingleVehicle = async (req: Request, res: Response) => {
  try {
    const vehicleId = Number(req.params.vehicleId);
    const checkVehicle = await pool.query(
      `SELECT availability_status FROM vehicles WHERE id = $1`,
      [vehicleId]
    );

    if (checkVehicle.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found!",
      });
    }

    if (checkVehicle.rows[0].availability_status === "booked") {
      return res.status(400).json({
        success: false,
        message: "Vehicle is currently booked and cannot be deleted.",
      });
    }
    await vehicleService.deleteSingleVehicle(vehicleId);

    return res.status(200).json({
      success: true,
      message: "Vehicle deleted successfully",
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

export const vehicleController = {
  createVehicle,
  getAllVehicle,
  getSingleVehicle,
  updateSingleVehicle,
  deleteSingleVehicle,
};
