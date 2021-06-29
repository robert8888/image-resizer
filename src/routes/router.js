import express from "express";
import upload from "@routes/upload/controler.js";
import download from "@routes/download/controler.js";

const router = express.Router();

router.use(upload)
router.use(download)

export default router;

