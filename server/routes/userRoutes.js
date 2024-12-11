import { Router } from "express";
import auth from "../middleware/auth.js";
import roleCheck from "../middleware/roleCheck.js";
import { getMe, getAllUsers } from "../controllers/userController.js";

const router = Router();

// Get authenticated user details
router.get("/me", auth, roleCheck(["user"]), getMe);

// Get all users with pagination
router.get("/", auth, roleCheck(["admin"]), getAllUsers);

export default router;
