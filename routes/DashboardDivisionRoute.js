import express from "express";
import {
  countDataVisitorByPurpose,
  countDataVisitorByStatus,
} from "../controllers/DashboardDivision.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get(
  "/division/count/data-visitor-status",
  verifyUser,
  countDataVisitorByStatus
);
router.get(
  "/division/count/data-visitor-purpose",
  verifyUser,
  countDataVisitorByPurpose
);

export default router;
