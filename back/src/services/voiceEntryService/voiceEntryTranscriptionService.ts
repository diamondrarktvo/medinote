// src/services/voiceEntryService/voiceEntryTranscriptionService.ts

import axios from "axios";
import { generateFileUrl } from "../../utils/helper";

export const transcribeAudio = async (filePath: string): Promise<string> => {
  const finalFilePath = generateFileUrl(filePath);
  try {
    /*const response = await axios.post(
      "https://transcription.onrender.com/api/transcript",
      { audioURL: finalFilePath },
      { headers: { "Content-Type": "application/json" } },
    );*/

    let transcription = "";
    if (!transcription) {
      transcription = `
        Consultation médicale - 20 février 2025

        Patient : Monsieur Dupont, 58 ans.
        Motif : Douleur persistante au genou droit depuis environ deux semaines, exacerbée par la marche.
        Antécédents : Aucun antécédent majeur rapporté. Le patient ne signale ni fièvre ni signes d'infection.
        Examen clinique : L'examen révèle une légère tuméfaction et une diminution de l'amplitude de mouvement du genou droit, avec une douleur notable à la palpation et à la mobilisation.
        Diagnostic : Suspicion d'entorse légère ou de tendinite du genou droit.
        Plan de traitement : Recommandation de repos, application régulière de glace, prise d'anti-inflammatoires, et suivi médical dans une semaine pour réévaluation.
        `;
    }
    return transcription;
  } catch (error) {
    console.error("Erreur lors de l'appel à l'API de transcription:", error);
    // En cas d'erreur, retourner une transcription fictive
    return "Transcription fictive : erreur lors de l'appel à l'API de transcription.";
  }
};
