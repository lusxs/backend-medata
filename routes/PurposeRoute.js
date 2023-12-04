import express from "express";
import {
  createPurpose,
  getPurposeByDivision,
  getPurposeById,
  getPurposes,
  isActivePurpose,
  updatePurpose,
} from "../controllers/Purpose.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.post("/purpose", createPurpose);
router.get("/purposes/:id", getPurposeByDivision);
router.get("/purposes", verifyUser, getPurposes);
router.patch("/purpose/active/:id", isActivePurpose);
router.patch("/purpose/:id", updatePurpose);
router.get("/purpose/detail/:id", getPurposeById);

export default router;
