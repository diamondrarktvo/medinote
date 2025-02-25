// src/routes/roomRoutes.ts

import { Router } from "express";
import * as gladiaController from "../controllers/gladiaController";

const router = Router();

router.post("/", gladiaController.gladiaCallBack);

export default router;
