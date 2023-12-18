import express from "express";
import {
  countDataVisitorByDivision,
  countDataVisitorByPurpose,
  countDataVisitorByStatus,
} from "../controllers/DashboardAdmin.js";

const router = express.Router();

router.get("/admin/count/data-visitor", countDataVisitorByDivision);
router.get("/admin/count/data-visitor-status", countDataVisitorByStatus);
router.get("/admin/count/data-visitor-purpose", countDataVisitorByPurpose);

export default router;
