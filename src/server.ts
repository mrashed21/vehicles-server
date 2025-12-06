import express, { Request, Response } from "express";
import cron from "node-cron";
import config from "./config";
import { initDB, pool } from "./database/database";
import router from "./router/router";

const app = express();

app.use(express.json());

initDB();

app.use("/api/v1", router);

cron.schedule("46 0 * * *", async () => {
  await pool.query(`
    UPDATE bookings
    SET status='returned'
    WHERE rent_end_date < CURRENT_DATE
    AND status='active'
  `);

  await pool.query(`
    UPDATE vehicles
    SET availability_status='available'
    WHERE id IN (
      SELECT vehicle_id 
      FROM bookings 
      WHERE rent_end_date < CURRENT_DATE AND status='returned'
    )
  `);
});

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "server is running",
    path: req.path,
  });
});

app.listen(config.port, () => {
  console.log(`Vehicle Rental System server running at ${config.port}`);
});
