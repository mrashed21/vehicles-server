import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router();

router.post("/signup", authController.createUser);
// router.get("/", )

export const authRoute = router;
