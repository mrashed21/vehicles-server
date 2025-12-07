import { Router } from "express";
import auth from "../../middleware/middleware";
import { Roles } from "../auth/auth.contast";
import { bookingController } from "./bookings.controller";

const router = Router();

router.post(
  "/",
  auth(Roles.admin, Roles.customer),
  bookingController.createBooking
);

router.get(
  "/",
  auth(Roles.admin, Roles.customer),
  bookingController.getBookings
);

router.put(
  "/:bookingId",
  auth(Roles.admin, Roles.customer),
  bookingController.updateBooking
);

export const bookingRoute = router;
