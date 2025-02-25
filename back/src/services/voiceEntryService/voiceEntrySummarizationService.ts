import { openai } from "../../config/ai-config";
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

  try {
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a medical assistant that provides structured summaries from audio transcriptions.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "gpt-4o-mini",
      temperature: 1,
      max_tokens: 4096,
      top_p: 1,
    });

    if (!response.choices[0].message.content) {
      throw new NotFoundError(
        "Summary not available. The transcription could not be summarized.",
      );
    }

    return response.choices[0].message.content;
  } catch (error) {
    console.error(error);

    if (error instanceof BadRequestError || error instanceof NotFoundError) {
      throw error;
    }

    throw new InternalServerError(
      "Something went wrong while generating the summary.",
    );
  }
};
