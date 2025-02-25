import path from "path";
import { AppDataSource } from "../../config/data-source";
import { Room } from "../../entities/Room";
import { VoiceEntry } from "../../entities/VoiceEntry";
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from "../../utils/CustomError";

export const createVoiceEntry = async (data: {
  transcription: string;
  summary: string;
  recording_url: string;
  room_id: string;
}) => {
  const voiceEntryRepository = AppDataSource.getRepository(VoiceEntry);
  const roomRepository = AppDataSource.getRepository(Room);

  try {
    if (
      !data.transcription ||
      !data.summary ||
      !data.recording_url ||
      !data.room_id
    ) {
      throw new BadRequestError(
        "Missing required fields: transcription, summary, recording_url, or room_id.",
      );
    }

    const room = await roomRepository.findOne({
      where: { id: parseInt(data.room_id) },
    });
    if (!room) {
      throw new NotFoundError(
        "Room not found. Please provide a valid room ID.",
      );
    }

    const fileName = path.basename(data.recording_url);
    if (!fileName) {
      throw new BadRequestError(
        "Invalid recording URL. Unable to extract file name.",
      );
    }

    const voiceEntry = new VoiceEntry();
    voiceEntry.transcription = data.transcription;
    voiceEntry.summary = data.summary;
    voiceEntry.recording_url = fileName;
    voiceEntry.room = room;

    await voiceEntryRepository.save(voiceEntry);
    return voiceEntry;
  } catch (error) {
    console.error("Error creating voice entry:", error);

    if (error instanceof BadRequestError || error instanceof NotFoundError) {
      throw error;
    }

    throw new InternalServerError("Failed to create voice entry.");
  }
};

export const getVoiceEntriesByRoomId = async (roomId: number) => {
  const voiceEntryRepository = AppDataSource.getRepository(VoiceEntry);

  try {
    const voiceEntries = await voiceEntryRepository.find({
      where: { room: { id: roomId } },
      relations: ["room"],
    });

    if (!voiceEntries || voiceEntries.length === 0) {
      throw new NotFoundError(
        "No voice entries found for the provided room ID.",
      );
    }

    return voiceEntries;
  } catch (error) {
    console.error("Error fetching voice entries:", error);

    if (error instanceof NotFoundError) {
      throw error;
    }

    throw new InternalServerError("Failed to fetch voice entries.");
  }
};
