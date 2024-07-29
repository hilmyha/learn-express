import { Router } from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
} from "../controllers/user.controller";

const router = Router();

router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.post("/users", createUser);
router.post("/users/login", loginUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

export default router;
