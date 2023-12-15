import express from "express";
import {
  getUsers,
  getUserById,
  createAdmin,
  isActivateUser,
  updateUser,
} from "../controllers/User.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/users", getUsers);
router.get("/user/:id", verifyUser, getUserById);
router.post("/admin", createAdmin);
router.patch("/user/active/:id", isActivateUser);
router.get("/user/detail/:id", verifyUser, getUserById);
router.patch("/user/:id", updateUser);

export default router;
