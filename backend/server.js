import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import formRoutes from "./routes/form.routes.js";
import speechRoutes from "./routes/speech.routes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/form", formRoutes);
app.use("/api/speech", speechRoutes);

app.get("/", (req, res) => {
  res.send("Server Running");
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));