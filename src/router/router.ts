import { Router } from "express";
import { authRoute } from "../modules/auth/auth.route";
import { userRoute } from "../modules/user/user.route";

const router = Router();
// auth route
router.use("/auth", authRoute);
// user route
router.use("/users", userRoute);
export default router;
