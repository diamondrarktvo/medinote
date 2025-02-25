import axios from "axios";
import { generateFileUrl } from "../../utils/helper";
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from "../../utils/CustomError";

export const transcribeAudio = async (filePath: string): Promise<string> => {
  const finalFilePath = generateFileUrl(filePath);

  if (!finalFilePath) {
    throw new BadRequestError(
      "Invalid file path. Please provide a valid file path.",
    );
  }

  try {
    let transcription = "";

    if (!transcription) {
      throw new NotFoundError(
        "Transcription not available. The audio could not be transcribed.",
      );
    }

    return transcription;
  } catch (error) {
    console.error("Erreur lors de l'appel à l'API de transcription:", error);

    if (error instanceof NotFoundError || error instanceof BadRequestError) {
      throw error;
    }

    throw new InternalServerError(
      "Something went wrong while processing the audio transcription.",
    );
  }
};
