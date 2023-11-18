import express from "express";
import {
  createPurpose,
  getPurposeByDivision,
  getPurposes,
} from "../controllers/Purpose.js";

const router = express.Router();

router.post("/purpose", createPurpose);
router.get("/purposes/:id", getPurposeByDivision);
router.get("/purposes", getPurposes);

export default router;
