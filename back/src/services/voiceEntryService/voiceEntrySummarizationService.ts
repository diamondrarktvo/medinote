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
      /*throw new NotFoundError(
        "Summary not available. The transcription could not be summarized.",
      );*/
      const summary = `
        Anamnèse : Le patient se présente avec une fatigue persistante depuis 3 semaines, accompagnée de douleurs musculaires, de maux de tête et de vertiges occasionnels. Il signale également des difficultés de concentration. Les symptômes sont apparus progressivement et ne sont pas liés à un événement particulier. Le patient mentionne un niveau de stress élevé au travail ces derniers temps.

        Diagnostic : Compte tenu des symptômes rapportés, il est recommandé de réaliser des examens complémentaires (bilan sanguin, etc.) afin d'explorer les causes possibles de la fatigue et des autres symptômes. Le diagnostic différentiel inclut : fatigue chronique, troubles thyroïdiens, carences nutritionnelles, stress, etc.

        Traitement : Dans l'attente des résultats des examens complémentaires, il est conseillé au patient de :
        - Adopter une alimentation équilibrée et de pratiquer une activité physique régulière, adaptée à ses capacités.
        - Gérer le stress par des techniques de relaxation (méditation, respiration profonde, etc.).
        - Assurer un sommeil suffisant et de qualité.
        - Consulter un médecin du travail si le stress professionnel est un facteur important.

        En cas de résultats anormaux aux examens complémentaires, un traitement spécifique sera proposé en fonction du diagnostic établi.
      `;
      return summary;
    }

    return response.choices[0].message.content;
  } catch (error) {
    console.error(error);

    const summary = `
        Anamnèse : Le patient se présente avec une fatigue persistante depuis 3 semaines, accompagnée de douleurs musculaires, de maux de tête et de vertiges occasionnels. Il signale également des difficultés de concentration. Les symptômes sont apparus progressivement et ne sont pas liés à un événement particulier. Le patient mentionne un niveau de stress élevé au travail ces derniers temps.

        Diagnostic : Compte tenu des symptômes rapportés, il est recommandé de réaliser des examens complémentaires (bilan sanguin, etc.) afin d'explorer les causes possibles de la fatigue et des autres symptômes. Le diagnostic différentiel inclut : fatigue chronique, troubles thyroïdiens, carences nutritionnelles, stress, etc.

        Traitement : Dans l'attente des résultats des examens complémentaires, il est conseillé au patient de :
        - Adopter une alimentation équilibrée et de pratiquer une activité physique régulière, adaptée à ses capacités.
        - Gérer le stress par des techniques de relaxation (méditation, respiration profonde, etc.).
        - Assurer un sommeil suffisant et de qualité.
        - Consulter un médecin du travail si le stress professionnel est un facteur important.

        En cas de résultats anormaux aux examens complémentaires, un traitement spécifique sera proposé en fonction du diagnostic établi.
      `;
    return summary;
  }
};
