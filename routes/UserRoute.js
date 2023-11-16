import express from "express";
import { getUsers, getUserById, createAdmin } from "../controllers/User.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/users", getUsers);
router.get("/users/:id", verifyUser, getUserById);
router.post("/admin", createAdmin);

export default router;
