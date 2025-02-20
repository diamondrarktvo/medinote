// src/routes/voiceEntryRoutes.ts
import { Router } from "express";
import * as voiceEntryController from "../controllers/voiceEntryController";
import { upload } from "../middlewares/upload";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.post(
  "/",
  upload.single("audioFile"),
  asyncHandler(voiceEntryController.createVoiceEntryController),
);

// GET /api/v1/voice?room_id=xxx
router.get("/", asyncHandler(voiceEntryController.getVoiceEntryByRoomId));

export default router;
