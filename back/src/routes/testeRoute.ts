// src/routes/testRoutes.ts

import { Router, Request, Response } from "express";

const router = Router();

router.get("/test-connection", async (req: Request, res: Response) => {
  try {
    res.json({
      success: true,
      message: "Connection succes",
    });
  } catch (error) {
    console.error("Connection error:", error);
    res.status(500).json({ success: false, error });
  }
});

export default router;
