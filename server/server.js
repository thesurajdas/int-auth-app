import express from "express";
import { config } from "dotenv";
import dbConnect from "./dbConnect.js";
import authRoutes from "./routes/auth.js";
import refreshToken from "./routes/refreshToken.js";
import userRoutes from "./routes/user.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
config();
dbConnect();

const corsOptions = {
  origin: "http://localhost:3000", // Replace with your client origin
  credentials: true, // Allow cookies and credentials
};

app.use(cookieParser());
app.use(express.json());
app.use(cors(corsOptions));

app.use("/api/auth", authRoutes);
app.use("/api/refresh", refreshToken);
app.use("/api/user", userRoutes);

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Running on: http://localhost:${port}`));
