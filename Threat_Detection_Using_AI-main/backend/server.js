import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import scanRoutes from "./routes/scan.js";
import statusRoutes from "./routes/status.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

app.get("/", (req, res) => res.send("Backend is running 🚀. Use POST /scan and GET /status?url=..."));

app.use("/scan", scanRoutes);
app.use("/status", statusRoutes);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));



