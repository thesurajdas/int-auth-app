import { Router } from "express";
import auth from "../middleware/auth.js";
import roleCheck from "../middleware/roleCheck.js";
import { getMe, getAllUsers, editMe } from "../controllers/userController.js";

const router = Router();

// Get authenticated user details
router.get("/me", auth, roleCheck(["user"]), getMe);

// Edit authenticated user details
router.patch("/me", auth, roleCheck(["user"]), editMe);

export default router;
