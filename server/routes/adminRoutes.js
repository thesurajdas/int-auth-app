import { Router } from "express";
import auth from "../middleware/auth.js";
import roleCheck from "../middleware/roleCheck.js";
import adminController from "../controllers/adminController.js";

const router = Router();
// const adminMiddleware = [auth, roleCheck(["admin"])];

// Route to get all users
router.get("/users", auth, roleCheck(["admin"]), adminController.getAllUsers);

// Route to get a specific user by ID
router.get("/users/:id", auth, roleCheck(["admin"]), adminController.getUserById);

// Route to update a user by ID
router.patch(
  "/users/:id",
  auth,
  roleCheck(["admin"]),
  adminController.updateUserById
);

// Route to delete a user by ID
router.delete(
  "/users/:id",
  auth,
  roleCheck(["admin"]),
  adminController.deleteUserById
);

export default router;
