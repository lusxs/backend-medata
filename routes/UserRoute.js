import express from "express";
import {
  getUsers,
  getUserById,
  createAdmin,
  createSupervisor,
  getSupervisors,
} from "../controllers/User.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/users", getUsers);
router.get("/users/:id", verifyUser, getUserById);
router.post("/admin", createAdmin);
router.post("/supervisor", createSupervisor);
router.get("/supervisors", getSupervisors);

export default router;
