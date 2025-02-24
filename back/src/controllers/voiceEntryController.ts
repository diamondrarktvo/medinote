// src/controllers/voiceEntryController.ts

import fs from "fs";
import { Request, Response, NextFunction } from "express";
import { Room } from "../entities/Room";
import * as voiceEntryService from "../services/voiceEntryService";
import { AppDataSource } from "../config/data-source";
import { getFilePath, generateFileUrl } from "../utils/helper";

export const createVoiceEntryController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    const { room_id } = req.body;

    if (!room_id) {
      return res
        .status(400)
        .json({ success: false, message: "room_id is required" });
    }

    const roomRepository = AppDataSource.getRepository(Room);

    const room = await roomRepository.findOne({
      where: { id: room_id },
    });

    if (!room) {
      return res
        .status(404)
        .json({ success: false, message: "Room not found" });
    }

    console.log("debut du travail");
    // Transcription de l'audio
    const transcription = await voiceEntryService.transcribeAudio(
      req.file.path,
    );

    console.log("transcription", transcription);

    // Résumé de la transcription
    const summary = await voiceEntryService.summarizeText(transcription);

    console.log("summary", summary);

    // Chiffrement du fichier audio
    const encryptedFilePath = await voiceEntryService.encryptFile(
      req.file.path,
    );

    console.log("encryptedFilePath", encryptedFilePath);

    // save voice entry
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
      return res.status(400).json({
        success: false,
        message: "Invalid room_id",
      });
    }

    // Récupérer les VoiceEntry associés au room_id
    const voiceEntries =
      await voiceEntryService.getVoiceEntriesByRoomId(roomId);

    // Décrypter les fichiers et mettre à jour recording_url
    const updatedVoiceEntries = await Promise.all(
      voiceEntries.map(async (entry) => {
        const encryptedFilePath = getFilePath(entry.recording_url); // Chemin complet du fichier chiffré

        const decryptedFilePath =
          await voiceEntryService.decryptFile(encryptedFilePath); // Chemin relatif du fichier déchiffré

        return {
          ...entry,
          recording_url: generateFileUrl(decryptedFilePath), // Mettre à jour recording_url avec le chemin relatif du fichier déchiffré
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
