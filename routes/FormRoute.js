import express from "express";
import { createForm, getForms } from "../controllers/Form.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/forms", verifyUser, getForms);
router.post("/form", createForm);

export default router;
