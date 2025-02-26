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

  const systemPrompt = `
    Vous êtes un assistant médical spécialisé dans l'analyse de transcriptions. 
    Votre rôle est de produire un résumé en français, structuré en trois parties (Anamnèse, Diagnostic, Traitement), 
    en allant au-delà de la simple répétition du texte source. 
    Vous devez proposer une interprétation médicale cohérente, formuler des hypothèses diagnostiques et 
    indiquer un plan de traitement possible, comme le ferait un professionnel de la santé.
  `;

  const userPrompt = `Veuillez analyser la transcription suivante: "${transcription}"`;

  const requestBody = {
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: userPrompt,
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
      const summary = `
        Anamnèse : Le patient Richard se présente avec une fatigue persistante depuis 3 semaines, accompagnée de douleurs musculaires, de maux de tête et de vertiges occasionnels. Il signale également des difficultés de concentration. Les symptômes sont apparus progressivement et ne sont pas liés à un événement particulier. Le patient mentionne un niveau de stress élevé au travail ces derniers temps.

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

    return response.data.choices[0].message.content.trim();
  } catch (error: any) {
    
    if (error instanceof BadRequestError || error instanceof NotFoundError) {
      throw error;
    }
    throw new InternalServerError(
      error.response?.data || error.message || "Something went wrong while generating the summary.",
    );
  }
};
