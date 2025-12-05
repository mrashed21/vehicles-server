import { Router } from "express";
import auth from "../../middleware/middleware";
import { Roles } from "../auth/auth.contast";
import { vehicleController } from "./vehicle.controller";
const router = Router();

router.post("/", auth(Roles.admin), vehicleController.createVehicle);
router.get("/", vehicleController.getAllVehicle);
router.get("/:vehicleId", vehicleController.getSingleVehicle);
router.put(
  "/:vehicleId",
  auth(Roles.admin),
  vehicleController.updateSingleVehicle
);

export const vehicleRoute = router;
