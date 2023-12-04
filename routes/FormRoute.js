import express from "express";
import {
  createForm,
  getFormById,
  getForms,
  updateStatus,
} from "../controllers/Form.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/forms", verifyUser, getForms);
router.post("/form", createForm);
router.patch("/form/:id", verifyUser, updateStatus);
router.get("/form/:id", verifyUser, getFormById);

export default router;
