import { Router } from "express";
import auth from "../../middleware/middleware";
import { Roles } from "../auth/auth.contast";
import { userController } from "./user.controller";

const router = Router();

router.get("/", auth(Roles.admin), userController.getAllUser);
// router.get("/", )

export const userRoute = router;
