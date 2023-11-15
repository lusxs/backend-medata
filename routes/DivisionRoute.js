import express from "express";
import { createDivision } from "../controllers/Division.js";

const router = express.Router();

router.post("/division", createDivision);

export default router;
