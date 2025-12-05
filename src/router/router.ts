import { Router } from "express";
import { authRoute } from "../modules/auth/auth.route";
import { bookingRoute } from "../modules/bookings/bookings.route";
import { userRoute } from "../modules/user/user.route";
import { vehicleRoute } from "../modules/vehicle/vehicle.route";

const router = Router();
// auth route
router.use("/auth", authRoute);
// user route
router.use("/users", userRoute);
// vehicle route
router.use("/vehicles", vehicleRoute);
// booking route
router.use("/bookings", bookingRoute);
export default router;
