// src/services/voiceEntryService.ts

import path from "path";
import { AppDataSource } from "../../config/data-source";
import { Room } from "../../entities/Room";
import { VoiceEntry } from "../../entities/VoiceEntry";

export const createVoiceEntry = async (data: {
  transcription: string;
  summary: string;
  recording_url: string;
  room_id: string;
}) => {
  const voiceEntryRepository = AppDataSource.getRepository(VoiceEntry);
  const roomRepository = AppDataSource.getRepository(Room);

  // Find the room
  const room = await roomRepository.findOne({
    where: { id: parseInt(data.room_id) },
  });
  if (!room) {
    throw new Error("Room not found");
  }

  const fileName = path.basename(data.recording_url);

  // Create and save the voice entry
  const voiceEntry = new VoiceEntry();
  voiceEntry.transcription = data.transcription;
  voiceEntry.summary = data.summary;
  voiceEntry.recording_url = fileName;
  voiceEntry.room = room;

  await voiceEntryRepository.save(voiceEntry);
  return voiceEntry;
};

export const getVoiceEntriesByRoomId = async (roomId: number) => {
  const voiceEntryRepository = AppDataSource.getRepository(VoiceEntry);

  // Récupérer les VoiceEntry associés au room_id
  const voiceEntries = await voiceEntryRepository.find({
    where: { room: { id: roomId } },
    relations: ["room"],
  });

  // Retourner les VoiceEntry sans modifier recording_url
  return voiceEntries;
};
