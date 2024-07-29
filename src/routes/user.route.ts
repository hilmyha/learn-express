import { Router } from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  refreshToken,
} from "../controllers/user.controller";

const router = Router();

router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.post("/users", createUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);
// login
router.post("/users/login", loginUser);
// refresh token
router.post("/users/refresh-token", refreshToken);
export default router;
