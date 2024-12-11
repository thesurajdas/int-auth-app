import express from "express";
import { config } from "dotenv";
import dbConnect from "./dbConnect.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import tokenRoutes from "./routes/tokenRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
config();
dbConnect();

const corsOptions = {
  origin: process.env.ORIGIN,
  credentials: true,
};

app.use(cookieParser());
app.use(express.json());
app.use(cors(corsOptions));

app.use("/api/auth", authRoutes);
app.use("/api/refresh", tokenRoutes);
app.use("/api/user", userRoutes);

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Running on: http://localhost:${port}`));
