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
// src/services/voiceEntryService/voiceEntryTranscriptionService.ts
const axios_1 = __importStar(require("axios"));
const helper_1 = require("../../utils/helper");
const CustomError_1 = require("../../utils/CustomError");
const env_1 = require("../../config/env");
const transcribeAudio = (filePath) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const fileUrl = (0, helper_1.generateFileUrl)(filePath);
    if (!fileUrl) {
        throw new CustomError_1.BadRequestError("Invalid file path. Please provide a valid file path.");
    }
    try {
        // Préparez le payload avec le callback activé
        const requestData = {
            audio_url: fileUrl,
            callback: true,
            callback_config: {
                url: env_1.env.GLADIA_CALLBACK_URL,
                method: "POST",
            },
            diarization: false,
            language: "fr",
            translation_config: {
                target_languages: ["fr"],
            },
        };
        const headers = {
            "Content-Type": "application/json",
            "x-gladia-key": env_1.env.GLADIA_API_KEY,
        };
        console.log("- Sending transcription request to Gladia API with callback...");
        const initialResponse = (yield axios_1.default.post(env_1.env.GLADIA_TRANSCRIPTION_URL, requestData, { headers })).data;
        console.log("- Initial response:", initialResponse);
        // Ici, au lieu de faire du polling, on renvoie un message indiquant que la transcription est en cours.
        if (!initialResponse || !initialResponse.id) {
            throw new CustomError_1.InternalServerError("Failed to initiate transcription with Gladia API.");
        }
        return "Transcription queued. You will be notified via callback once completed.";
    }
    catch (error) {
        if (error instanceof axios_1.AxiosError) {
            console.error(`AxiosError on ${(_a = error.config) === null || _a === void 0 ? void 0 : _a.url}: ${error.message}\nResponse: ${JSON.stringify((_b = error.response) === null || _b === void 0 ? void 0 : _b.data)}`);
        }
        else {
            console.error("Error during transcription request:", error);
        }
        throw new CustomError_1.InternalServerError("Something went wrong while processing the audio transcription.");
    }
});
exports.transcribeAudio = transcribeAudio;
