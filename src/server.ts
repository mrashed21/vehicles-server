import express, { Request, Response } from "express";
import { initDB } from "./database/database";

const app = express();
const PORT = 5000;
app.use(express.json());

initDB();

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "server is running",
    path: req.path,
  });
});

app.listen(PORT, () => {
  console.log(`Vehicle Rental System server running at ${PORT}`);
});
