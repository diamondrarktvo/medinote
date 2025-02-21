// src/services/voiceEntryService/voiceEntrySummarizationService.ts

export const summarizeText = async (transcription: string): Promise<string> => {
  // Simuler le traitement par un service d'IA pour générer un résumé structuré.

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
};
