import { Router } from "express";
import { createAccessToken } from "../controllers/tokenController.js";

const router = Router();

// Route to generate a new access token
router.post("/", createAccessToken);

export default router;
