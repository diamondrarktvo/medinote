"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.transcribeAudio = void 0;
const axios_1 = __importStar(require("axios"));
const helper_1 = require("../../utils/helper");
const env_1 = require("../../config/env");
const CustomError_1 = require("../../utils/CustomError");
/**
 * Effectue un polling pour récupérer le résultat de la transcription.
 * @param resultUrl L'URL pour récupérer le résultat.
 * @param headers Les headers à utiliser pour la requête.
 * @returns La transcription complète.
 */
function pollForResult(resultUrl, headers) {
    return __awaiter(this, void 0, void 0, function* () {
        const maxRetries = 50;
        const pollInterval = 5000; // 5 secondes
        for (let i = 0; i < maxRetries; i++) {
            console.log(`Polling for results... (tentative ${i + 1})`);
            const pollResponse = (yield axios_1.default.get(resultUrl, { headers })).data;
            if (pollResponse.status === "done") {
                console.log("- Transcription done.");
                // On suppose que la transcription se trouve dans result.transcription.full_transcript
                return pollResponse.result.transcription.full_transcript.trim();
            }
            else if (pollResponse.status === "failed") {
                throw new Error("Transcription process failed.");
            }
            // Attendre pollInterval avant de refaire une tentative
            yield new Promise((resolve) => setTimeout(resolve, pollInterval));
        }
        throw new Error("Transcription not completed within the expected time.");
    });
}
const transcribeAudio = (filePath) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const fileUrl = (0, helper_1.generateFileUrl)(filePath);
    try {
        const requestData = {
            audio_url: fileUrl,
            diarization: false,
            language: "fr",
            translation_config: {
                target_languages: ["fr"],
                model: "base",
            },
        };
        const headers = {
            "Content-Type": "application/json",
            "x-gladia-key": env_1.env.GLADIA_API_KEY,
        };
        console.log("- Sending initial transcription request to Gladia API...");
        const initialResponse = (yield axios_1.default.post(`${env_1.env.GLADIA_TRANSCRIPTION_URL}`, requestData, {
            headers,
        })).data;
        console.log("- Initial response:", initialResponse);
        const resultUrl = initialResponse.result_url;
        if (!resultUrl) {
            throw new Error("No result_url returned from Gladia API.");
        }
        // Effectuer un polling pour récupérer le résultat de la transcription
        const transcriptionResult = yield pollForResult(resultUrl, headers);
        if (!transcriptionResult) {
            return `
        Bonjour, je m'appelle Dupond-Marie, j'ai 35 ans. J'ai fait une consultation et les motifs de la consultation sont douleur abdominale depuis deux jours, fièvre de 38,5°C et fatigue. J'ai fait un examen clinique, la température reste la même, ma tension artérielle se sent enfin par 80 mmHg, auscultation pulmonaire normale, palpation abdominale, Tout l'heure dans la région de la fosse il y a quatre ou huit.
      `;
        }
        return transcriptionResult;
    }
    catch (error) {
        if (error instanceof axios_1.AxiosError) {
            console.error(`AxiosError on ${(_a = error.config) === null || _a === void 0 ? void 0 : _a.url}: ${error.message}\nResponse: ${JSON.stringify((_b = error.response) === null || _b === void 0 ? void 0 : _b.data)}`);
        }
        throw new CustomError_1.InternalServerError("Something went wrong while transcription process." + error);
    }
});
exports.transcribeAudio = transcribeAudio;
