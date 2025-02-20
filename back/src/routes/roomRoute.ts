// src/routes/roomRoutes.ts

import { Router } from "express";
import * as roomController from "../controllers/roomController";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.post("/", roomController.createRoom);

// GET /api/v1/rooms?device_id=xxx
router.get("/", asyncHandler(roomController.getAllRooms));

// GET /api/v1/rooms/:id?device_id=xxx
router.get("/:id", asyncHandler(roomController.getRoomById));

router.put("/:id", roomController.updateRoom);

router.delete("/:id", roomController.deleteRoom);

export default router;
