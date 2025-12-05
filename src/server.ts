import express, { Request, Response } from "express";
import config from "./config";
import { initDB } from "./database/database";
import router from "./router/router";

const app = express();

app.use(express.json());

initDB();

app.use("/api/v1", router);

// app.use("/api/v1/users", userRoute);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "server is running",
    path: req.path,
  });
});

app.listen(config.port, () => {
  console.log(`Vehicle Rental System server running at ${config.port}`);
});
