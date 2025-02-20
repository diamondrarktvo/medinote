"use strict";
// src/services/voiceEntryService.ts
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
const createVoiceEntry = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const voiceEntryRepository = data_source_1.AppDataSource.getRepository(VoiceEntry_1.VoiceEntry);
    const roomRepository = data_source_1.AppDataSource.getRepository(Room_1.Room);
    // Find the room
    const room = yield roomRepository.findOne({
        where: { id: parseInt(data.room_id) },
    });
    if (!room) {
        throw new Error("Room not found");
    }
    const fileName = path_1.default.basename(data.recording_url);
    // Create and save the voice entry
    const voiceEntry = new VoiceEntry_1.VoiceEntry();
    voiceEntry.transcription = data.transcription;
    voiceEntry.summary = data.summary;
    voiceEntry.recording_url = fileName;
    voiceEntry.room = room;
    yield voiceEntryRepository.save(voiceEntry);
    return voiceEntry;
});
exports.createVoiceEntry = createVoiceEntry;
const getVoiceEntriesByRoomId = (roomId) => __awaiter(void 0, void 0, void 0, function* () {
    const voiceEntryRepository = data_source_1.AppDataSource.getRepository(VoiceEntry_1.VoiceEntry);
    // Récupérer les VoiceEntry associés au room_id
    const voiceEntries = yield voiceEntryRepository.find({
        where: { room: { id: roomId } },
        relations: ["room"],
    });
    // Retourner les VoiceEntry sans modifier recording_url
    return voiceEntries;
});
exports.getVoiceEntriesByRoomId = getVoiceEntriesByRoomId;
