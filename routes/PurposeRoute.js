import express, { Router } from "express";
import { createPurpose } from "../controllers/Purpose.js";

const router = express.Router();

router.post("/purpose", createPurpose);

export default Router;
