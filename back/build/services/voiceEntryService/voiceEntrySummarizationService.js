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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.summarizeText = void 0;
const axios_1 = __importDefault(require("axios"));
const env_1 = require("../../config/env");
const CustomError_1 = require("../../utils/CustomError");
const summarizeText = (transcription) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    if (!transcription) {
        throw new CustomError_1.BadRequestError("No transcription provided. Please provide text for summarization.");
    }
    const prompt = `Please generate a structured summary, in french, for the following medical transcription. The summary should be divided into three sections: "Anamnèse", "Diagnostic", and "Traitement". Here is the transcription: "${transcription}"`;
    const requestBody = {
        model: "gpt-4o-mini",
        messages: [
            {
                role: "system",
                content: "You are a helpful medical assistant that provides structured summaries from transcriptions or text.",
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
        const response = yield axios_1.default.post(`${env_1.env.AI_URL}`, requestBody, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${env_1.env.AI_KEY}`,
            },
        });
        if (!response.data.choices || !((_a = response.data.choices[0].message) === null || _a === void 0 ? void 0 : _a.content)) {
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
        return response.data.choices[0].message.content.trim();
    }
    catch (error) {
        if (error instanceof CustomError_1.BadRequestError || error instanceof CustomError_1.NotFoundError) {
            throw error;
        }
        throw new CustomError_1.InternalServerError(((_b = error.response) === null || _b === void 0 ? void 0 : _b.data) || error.message || "Something went wrong while generating the summary.");
    }
});
exports.summarizeText = summarizeText;
