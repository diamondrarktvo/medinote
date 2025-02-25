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
exports.getVoiceEntriesByRoomId = exports.createVoiceEntry = void 0;
const path_1 = __importDefault(require("path"));
const data_source_1 = require("../../config/data-source");
const Room_1 = require("../../entities/Room");
const VoiceEntry_1 = require("../../entities/VoiceEntry");
const CustomError_1 = require("../../utils/CustomError");
const createVoiceEntry = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const voiceEntryRepository = data_source_1.AppDataSource.getRepository(VoiceEntry_1.VoiceEntry);
    const roomRepository = data_source_1.AppDataSource.getRepository(Room_1.Room);
    try {
        if (!data.transcription ||
            !data.summary ||
            !data.recording_url ||
            !data.room_id) {
            throw new CustomError_1.BadRequestError("Missing required fields: transcription, summary, recording_url, or room_id.");
        }
        const room = yield roomRepository.findOne({
            where: { id: parseInt(data.room_id) },
        });
        if (!room) {
            throw new CustomError_1.NotFoundError("Room not found. Please provide a valid room ID.");
        }
        const fileName = path_1.default.basename(data.recording_url);
        if (!fileName) {
            throw new CustomError_1.BadRequestError("Invalid recording URL. Unable to extract file name.");
        }
        const voiceEntry = new VoiceEntry_1.VoiceEntry();
        voiceEntry.transcription = data.transcription;
        voiceEntry.summary = data.summary;
        voiceEntry.recording_url = fileName;
        voiceEntry.room = room;
        yield voiceEntryRepository.save(voiceEntry);
        return voiceEntry;
    }
    catch (error) {
        console.error("Error creating voice entry:", error);
        if (error instanceof CustomError_1.BadRequestError || error instanceof CustomError_1.NotFoundError) {
            throw error;
        }
        throw new CustomError_1.InternalServerError("Failed to create voice entry.");
    }
});
exports.createVoiceEntry = createVoiceEntry;
const getVoiceEntriesByRoomId = (roomId) => __awaiter(void 0, void 0, void 0, function* () {
    const voiceEntryRepository = data_source_1.AppDataSource.getRepository(VoiceEntry_1.VoiceEntry);
    try {
        const voiceEntries = yield voiceEntryRepository.find({
            where: { room: { id: roomId } },
            relations: ["room"],
        });
        if (!voiceEntries || voiceEntries.length === 0) {
            throw new CustomError_1.NotFoundError("No voice entries found for the provided room ID.");
        }
        return voiceEntries;
    }
    catch (error) {
        console.error("Error fetching voice entries:", error);
        if (error instanceof CustomError_1.NotFoundError) {
            throw error;
        }
        throw new CustomError_1.InternalServerError("Failed to fetch voice entries.");
    }
});
exports.getVoiceEntriesByRoomId = getVoiceEntriesByRoomId;
