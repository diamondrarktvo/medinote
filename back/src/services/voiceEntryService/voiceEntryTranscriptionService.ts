import axios, { AxiosError } from "axios";
import { generateFileUrl } from "../../utils/helper";
import { env } from "../../config/env";

/**
 * Effectue un polling pour récupérer le résultat de la transcription.
 * @param resultUrl L'URL pour récupérer le résultat.
 * @param headers Les headers à utiliser pour la requête.
 * @returns La transcription complète.
 */
async function pollForResult(
  resultUrl: string,
  headers: Record<string, string>,
): Promise<string> {
  const maxRetries = 50;
  const pollInterval = 5000; // 5 secondes
  for (let i = 0; i < maxRetries; i++) {
    console.log(`Polling for results... (tentative ${i + 1})`);
    const pollResponse = (await axios.get(resultUrl, { headers })).data;
    if (pollResponse.status === "done") {
      console.log("- Transcription done.");
      // On suppose que la transcription se trouve dans result.transcription.full_transcript
      return pollResponse.result.transcription.full_transcript.trim();
    } else if (pollResponse.status === "failed") {
      throw new Error("Transcription process failed.");
    }
    // Attendre pollInterval avant de refaire une tentative
    await new Promise((resolve) => setTimeout(resolve, pollInterval));
  }
  throw new Error("Transcription not completed within the expected time.");
}

export const transcribeAudio = async (filePath: string): Promise<string> => {
  const fileUrl = generateFileUrl(filePath);
  try {
    const requestData = {
      audio_url: fileUrl,
      diarization: false,
      language: "fr",
      translation_config: {
        target_languages: ["fr"],
        model: "base",
      },
    };

    const headers = {
      "Content-Type": "application/json",
      "x-gladia-key": env.GLADIA_API_KEY!,
    };

    console.log("- Sending initial transcription request to Gladia API...");
    const initialResponse = (
      await axios.post(`${env.GLADIA_TRANSCRIPTION_URL}`, requestData, {
        headers,
      })
    ).data;

    console.log("- Initial response:", initialResponse);

    const resultUrl = initialResponse.result_url;
    if (!resultUrl) {
      throw new Error("No result_url returned from Gladia API.");
    }

    // Effectuer un polling pour récupérer le résultat de la transcription
    const transcriptionResult = await pollForResult(resultUrl, headers);
    return transcriptionResult;
  } catch (error: any) {
    if (error instanceof AxiosError) {
      console.error(
        `AxiosError on ${error.config?.url}: ${error.message}\nResponse: ${JSON.stringify(error.response?.data)}`,
      );
    } else {
      console.error("Error during transcription:", error);
    }
    throw error;
  }
};
