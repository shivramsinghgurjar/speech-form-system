import express from "express";
import { saveForm } from "../controllers/form.controller.js";

const router = express.Router();

router.post("/", saveForm);

export default router;