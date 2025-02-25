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
const ai_config_1 = require("../../config/ai-config");
const CustomError_1 = require("../../utils/CustomError");
const summarizeText = (transcription) => __awaiter(void 0, void 0, void 0, function* () {
    if (!transcription) {
        throw new CustomError_1.BadRequestError("No transcription provided. Please provide text for summarization.");
    }
    const prompt = `Please generate a structured summary, in french, for the following medical transcription. The summary should be divided into three sections: "Anamnèse", "Diagnostic", and "Traitement". Here is the transcription: "${transcription}"`;
    try {
        const response = yield ai_config_1.openai.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You are a medical assistant that provides structured summaries from audio transcriptions.",
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
            throw new CustomError_1.NotFoundError("Summary not available. The transcription could not be summarized.");
        }
        return response.choices[0].message.content;
    }
    catch (error) {
        console.error(error);
        if (error instanceof CustomError_1.BadRequestError || error instanceof CustomError_1.NotFoundError) {
            throw error;
        }
        throw new CustomError_1.InternalServerError("Something went wrong while generating the summary.");
    }
});
exports.summarizeText = summarizeText;
