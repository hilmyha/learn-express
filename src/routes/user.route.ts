import { Router } from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller";
import authMiddleware from "../middleware/auth.middleware";
import isAdminMiddleware from "../middleware/isadmin.middleware";

const router = Router();

router.get("/users", [authMiddleware, isAdminMiddleware], getUsers);
router.get("/users/:id", [authMiddleware, isAdminMiddleware], getUserById);
router.post("/users", [authMiddleware, isAdminMiddleware], createUser);
router.put("/users/:id", [authMiddleware, isAdminMiddleware], updateUser);
router.delete("/users/:id", [authMiddleware, isAdminMiddleware], deleteUser);

export default router;
