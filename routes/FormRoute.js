import express from "express";
import { createForm } from "../controllers/Form.js";

const router = express.Router();

router.get("/form", createForm);

export default router;
