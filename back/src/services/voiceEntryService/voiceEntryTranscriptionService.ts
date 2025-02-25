// src/services/voiceEntryService/voiceEntryTranscriptionService.ts
import axios, { AxiosError } from "axios";
import { generateFileUrl } from "../../utils/helper";
import { BadRequestError, InternalServerError } from "../../utils/CustomError";
import { env } from "../../config/env";

export const transcribeAudio = async (filePath: string): Promise<string> => {
  const fileUrl = generateFileUrl(filePath);
  if (!fileUrl) {
    throw new BadRequestError(
      "Invalid file path. Please provide a valid file path.",
    );
  }

  try {
    // Préparez le payload avec le callback activé
    const requestData = {
      audio_url: fileUrl,
      callback: true,
      callback_config: {
        url: env.GLADIA_CALLBACK_URL,
        method: "POST",
      },
      diarization: false,
      language: "fr",
      translation_config: {
        target_languages: ["fr"],
      },
    };

    const headers = {
      "Content-Type": "application/json",
      "x-gladia-key": env.GLADIA_API_KEY!,
    };

    console.log(
      "- Sending transcription request to Gladia API with callback...",
    );
    const initialResponse = (
      await axios.post(env.GLADIA_TRANSCRIPTION_URL!, requestData, { headers })
    ).data;

    console.log("- Initial response:", initialResponse);

    // Ici, au lieu de faire du polling, on renvoie un message indiquant que la transcription est en cours.
    if (!initialResponse || !initialResponse.id) {
      throw new InternalServerError(
        "Failed to initiate transcription with Gladia API.",
      );
    }
    return "Transcription queued. You will be notified via callback once completed.";
  } catch (error: any) {
    if (error instanceof AxiosError) {
      console.error(
        `AxiosError on ${error.config?.url}: ${error.message}\nResponse: ${JSON.stringify(error.response?.data)}`,
      );
    } else {
      console.error("Error during transcription request:", error);
    }
    throw new InternalServerError(
      "Something went wrong while processing the audio transcription.",
    );
  }
};
