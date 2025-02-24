// src/services/voiceEntryService/voiceEntrySummarizationService.ts
import axios from "axios";
import { env } from "../../config/env";

export const summarizeText = async (transcription: string): Promise<string> => {
  // Construire le prompt pour générer un résumé structuré
  const prompt = `Please generate a structured summary, in french, for the following medical transcription. The summary should be divided into three sections: "Anamnèse", "Diagnostic", and "Traitement". Here is the transcription: "${transcription}"`;

  try {
    const response = await axios.post(
      env.OPENAI_API_URL!,
      {
        model: "gpt-3.5-turbo-0613",
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
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${env.OPENAI_API_KEY}`,
        },
      },
    );
    const summary = response.data.choices[0].message.content.trim();
    return summary;
  } catch (error) {
    console.error("Erreur lors de l'appel à l'API de résumé:", error);
    return "Résumé simulé :\nAnamnèse - Le patient présente une fatigue et des douleurs articulaires persistantes depuis une semaine.\nDiagnostic - Aucun signe d'infection ou d'anomalie aiguë n'est détecté.\nTraitement - Recommandation de repos et suivi médical régulier.";
  }
};
