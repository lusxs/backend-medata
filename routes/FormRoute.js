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
router.get("/count", verifyUser, generateWeeklyDataWithCounts);
router.get("/form/count/purpose/:purposeId", countDataVisitorToday);
router.get("/form/count/division/:divisionId", countDataVisitorToday);
router.get("/form/count/status/:status", countDataVisitorToday);
router.get(
  "/form/count/purpose/:purposeId/division/:divisionId",
  countDataVisitorToday
);
router.get("/reports", generateReport);

export default router;
