import express from "express";
import { createDivision, getDivisions } from "../controllers/Division.js";

const router = express.Router();

router.post("/division", createDivision);
router.get("/divisions", getDivisions);

export default router;
