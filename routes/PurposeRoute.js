import express from "express";
import {
  createPurpose,
  getPurposeByDivision,
  getPurposes,
} from "../controllers/Purpose.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.post("/purpose", createPurpose);
router.get("/purposes/:id", getPurposeByDivision);
router.get("/purposes", verifyUser, getPurposes);

export default router;
