// src/services/voiceEntryService/voiceEntryTranscriptionService.ts

import axios from "axios";

export const transcribeAudio = async (filePath: string): Promise<string> => {
  console.log("Chemin du fichier audio :", filePath);
  try {
    const response = await axios.post(
      "https://transcription.onrender.com/api/transcript",
      { audioURL: filePath },
      { headers: { "Content-Type": "application/json" } },
    );

    let transcription = response.data.transcription;
    if (!transcription) {
      // Si aucune transcription n'est retournée, simuler une transcription fictive
      transcription =
        "Bonjour docteur, je suis venu vous voir car je me sens très fatigué depuis quelques semaines. J'ai du mal à me concentrer et j'ai des douleurs musculaires.";
    }
    return transcription;
  } catch (error) {
    console.error("Erreur lors de l'appel à l'API de transcription:", error);
    // En cas d'erreur, retourner une transcription fictive
    return "Transcription fictive : erreur lors de l'appel à l'API de transcription.";
  }
};
