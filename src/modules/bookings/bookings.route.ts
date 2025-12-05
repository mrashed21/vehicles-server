import { Router } from "express";
import auth from "../../middleware/middleware";
import { Roles } from "../auth/auth.contast";
import { bookingController } from "./bookings.controller";

const router = Router();

router.post(
  "/bookings",
  auth(Roles.admin, Roles.customer),
  bookingController.createBooking
);

export const bookingRoute = router;
