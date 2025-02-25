import axios from "axios";
import { env } from "../../config/env";
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from "../../utils/CustomError";

export const summarizeText = async (transcription: string): Promise<string> => {
  if (!transcription) {
    throw new BadRequestError(
      "No transcription provided. Please provide text for summarization.",
    );
  }

  const prompt = `Please generate a structured summary, in french, for the following medical transcription. The summary should be divided into three sections: "Anamnèse", "Diagnostic", and "Traitement". Here is the transcription: "${transcription}"`;

  const requestBody = {
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You are a helpful medical assistant that provides structured summaries from transcriptions or text.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.7,
    max_tokens: 4096,
    top_p: 1,
  };

  try {
    const response = await axios.post(`${env.AI_URL}`, requestBody, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.AI_KEY}`,
      },
    });

    if (!response.data.choices || !response.data.choices[0].message?.content) {
      throw new NotFoundError(
        "Summary not available. The transcription could not be summarized.",
      );
    }

    return response.data.choices[0].message.content.trim();
  } catch (error: any) {
    console.error(
      "Error generating summary:",
      error.response?.data || error.message,
    );
    if (error instanceof BadRequestError || error instanceof NotFoundError) {
      throw error;
    }
    throw new InternalServerError(
      "Something went wrong while generating the summary.",
    );
  }
};
