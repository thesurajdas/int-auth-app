import express from "express";
import { config } from "dotenv";
import dbConnect from "./dbConnect.js";
import authRoutes from "./routes/auth.js";
import refreshToken from "./routes/refreshToken.js";
import userRoutes from "./routes/user.js";
import cors from "cors";

const app = express();
config();
dbConnect();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/refresh", refreshToken);
app.use("/api/user", userRoutes);

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Running on: http://localhost:${port}`));
