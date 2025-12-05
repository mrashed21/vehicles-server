import { Router } from "express";
import { authRoute } from "../modules/auth/auth.route";

const router = Router();
// auth route
router.use("/auth", authRoute);
// user route
// router.use("/users", userRoute);
export default router;
