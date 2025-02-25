"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.summarizeText = void 0;
const summarizeText = (transcription) => __awaiter(void 0, void 0, void 0, function* () {
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
});
exports.summarizeText = summarizeText;
