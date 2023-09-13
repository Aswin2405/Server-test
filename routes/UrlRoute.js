import express from "express";
import { createUrl, getAnalytics, getShortId } from "../controllers/UrlController.js";

const router = express.Router()

router.post("/",createUrl)

router.get("/analytics/:id",getAnalytics)

router.get("/:id",getShortId)

export default router