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
router.get("/users/:id", authMiddleware, getUserById);
router.post("/users", authMiddleware, createUser);
router.put("/users/:id", authMiddleware, updateUser);
router.delete("/users/:id", authMiddleware, deleteUser);

export default router;
