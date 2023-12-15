import express from "express";
import {
  createForm,
  getFormById,
  getForms,
  updateStatus,
  countDataVisitorToday,
  generateWeeklyDataWithCounts,
} from "../controllers/Form.js";
import { verifyUser } from "../middleware/AuthUser.js";
import { generateReport } from "../controllers/Report.js";

const router = express.Router();

router.get("/forms", verifyUser, getForms);
router.post("/form", createForm);
router.patch("/form/:id", verifyUser, updateStatus);
router.get("/form/:id", verifyUser, getFormById);
router.get("/form/count/day", generateWeeklyDataWithCounts);

// Endpoint untuk laporan berdasarkan rentang waktu
router.get("/reports", generateReport);

export default router;
