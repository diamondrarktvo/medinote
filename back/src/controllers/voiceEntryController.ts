import fs from "fs";
import { Request, Response, NextFunction } from "express";
import { Room } from "../entities/Room";
import * as voiceEntryService from "../services/voiceEntryService";
import { AppDataSource } from "../config/data-source";
import { getFilePath, generateFileUrl } from "../utils/helper";
import { BadRequestError, NotFoundError } from "../utils/CustomError";

export const createVoiceEntryController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.file) {
      throw new BadRequestError(
        "No audio file provided. Please provide an audio file for transcription.",
      );
    }

    const { room_id } = req.body;
    if (!room_id) {
      throw new BadRequestError("room_id is required.");
    }

    const roomRepository = AppDataSource.getRepository(Room);
    const room = await roomRepository.findOne({
      where: { id: room_id },
    });

    if (!room) {
      throw new NotFoundError("Room not found.");
    }

    console.log("Début du traitement");

    const transcription = await voiceEntryService.transcribeAudio(
      req.file.path,
    );
    console.log("Transcription:", transcription);

    const summary = await voiceEntryService.summarizeText(transcription);
    console.log("Résumé:", summary);

    const encryptedFilePath = await voiceEntryService.encryptFile(
      req.file.path,
    );

    const voiceEntrySaved = await voiceEntryService.createVoiceEntry({
      transcription,
      summary,
      recording_url: encryptedFilePath,
      room_id,
    });

    res.status(201).json({
      success: true,
      message: "File uploaded and processed successfully",
      data: voiceEntrySaved,
    });
  } catch (error) {
    next(error);
  }
};

export const getVoiceEntryByRoomId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const roomId = parseInt(req.query.room_id as string);
    if (isNaN(roomId)) {
      throw new BadRequestError("Invalid room_id.");
    }

    const voiceEntries =
      await voiceEntryService.getVoiceEntriesByRoomId(roomId);

    const updatedVoiceEntries = await Promise.all(
      voiceEntries.map(async (entry) => {
        const encryptedFilePath = getFilePath(entry.recording_url);
        const decryptedFilePath =
          await voiceEntryService.decryptFile(encryptedFilePath);

        return {
          ...entry,
          recording_url: generateFileUrl(decryptedFilePath),
        };
      }),
    );

    res.status(200).json({
      success: true,
      message: "VoiceEntries retrieved and decrypted successfully",
      data: updatedVoiceEntries,
    });
  } catch (error) {
    next(error);
  }
};
