import { Router } from "express";
import { register, login, logout } from "../controllers/authController.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.delete("/logout", logout);

export default router;
