// src/routes/testRoutes.ts

import { Router, Request, Response } from "express";
import pool from "../config/database";

const router = Router();

router.get("/test-connection", async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query("SELECT 1");
    res.json({ success: true, rows });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ success: false, error });
  }
});

export default router;
