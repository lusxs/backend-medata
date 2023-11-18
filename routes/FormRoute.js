import express from "express";
import { createForm, getForms } from "../controllers/Form.js";

const router = express.Router();

router.get("/forms", getForms);
router.post("/form", createForm);

export default router;
