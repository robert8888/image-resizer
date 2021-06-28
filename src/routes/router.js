import express from "express";
import upload from "@routes/upload";

const router = express.Router();

router.use(upload)

export default router;

