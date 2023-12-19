import express from "express";
import {
  createForm,
  getFormById,
  getForms,
  updateStatus,
  generateWeeklyDataWithCounts,
  countDataVisitorByMonth,
  getYears,
  countDataVisitorByYear,
} from "../controllers/Form.js";
import { verifyUser } from "../middleware/AuthUser.js";
import { generateReport } from "../controllers/Report.js";

const router = express.Router();

router.get("/forms", verifyUser, getForms);
router.post("/form", createForm);
router.patch("/form/:id", verifyUser, updateStatus);
router.get("/form/:id", verifyUser, getFormById);
router.get("/count/:divisionId", verifyUser, generateWeeklyDataWithCounts);
router.get("/form/monthly/count/:year/:divisionId", countDataVisitorByMonth);
router.get("/form/yearly/count/:divisionId", countDataVisitorByYear);
router.get("/years", getYears);
router.get("/reports", generateReport);

export default router;
