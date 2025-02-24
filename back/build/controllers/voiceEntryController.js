"use strict";
// src/controllers/voiceEntryController.ts
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (
          !desc ||
          ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }
    : function (o, v) {
        o["default"] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  (function () {
    var ownKeys = function (o) {
      ownKeys =
        Object.getOwnPropertyNames ||
        function (o) {
          var ar = [];
          for (var k in o)
            if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
          return ar;
        };
      return ownKeys(o);
    };
    return function (mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null)
        for (var k = ownKeys(mod), i = 0; i < k.length; i++)
          if (k[i] !== "default") __createBinding(result, mod, k[i]);
      __setModuleDefault(result, mod);
      return result;
    };
  })();
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVoiceEntryByRoomId = exports.createVoiceEntryController = void 0;
const Room_1 = require("../entities/Room");
const voiceEntryService = __importStar(
  require("../services/voiceEntryService"),
);
const data_source_1 = require("../config/data-source");
const helper_1 = require("../utils/helper");
const createVoiceEntryController = (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      if (!req.file) {
        return res
          .status(400)
          .json({ success: false, message: "No file uploaded" });
      }
      const { room_id } = req.body;
      if (!room_id) {
        return res
          .status(400)
          .json({ success: false, message: "room_id is required" });
      }
      const roomRepository = data_source_1.AppDataSource.getRepository(
        Room_1.Room,
      );
      const room = yield roomRepository.findOne({
        where: { id: room_id },
      });
      if (!room) {
        return res
          .status(404)
          .json({ success: false, message: "Room not found" });
      }
      // Transcription de l'audio
      const transcription = yield voiceEntryService.transcribeAudio(
        req.file.path,
      );
      // Résumé de la transcription
      const summary = yield voiceEntryService.summarizeText(transcription);
      // Chiffrement du fichier audio
      const encryptedFilePath = yield voiceEntryService.encryptFile(
        req.file.path,
      );
      // save voice entry
      const voiceEntrySaved = yield voiceEntryService.createVoiceEntry({
        transcription,
        summary,
        recording_url: encryptedFilePath,
        room_id,
      });
      res.status(201).json({
        success: true,
        message: "File uploaded and processed successfully",
        data: voiceEntrySaved,
      });
    } catch (error) {
      next(error);
    }
  });
exports.createVoiceEntryController = createVoiceEntryController;
const getVoiceEntryByRoomId = (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const roomId = parseInt(req.query.room_id);
      if (isNaN(roomId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid room_id",
        });
      }
      // Récupérer les VoiceEntry associés au room_id
      const voiceEntries =
        yield voiceEntryService.getVoiceEntriesByRoomId(roomId);
      // Décrypter les fichiers et mettre à jour recording_url
      const updatedVoiceEntries = yield Promise.all(
        voiceEntries.map((entry) =>
          __awaiter(void 0, void 0, void 0, function* () {
            const encryptedFilePath = (0, helper_1.getFilePath)(
              entry.recording_url,
            ); // Chemin complet du fichier chiffré
            const decryptedFilePath =
              yield voiceEntryService.decryptFile(encryptedFilePath); // Chemin relatif du fichier déchiffré
            return Object.assign(Object.assign({}, entry), {
              recording_url: (0, helper_1.generateFileUrl)(decryptedFilePath),
            });
          }),
        ),
      );
      res.status(200).json({
        success: true,
        message: "VoiceEntries retrieved and decrypted successfully",
        data: updatedVoiceEntries,
      });
    } catch (error) {
      next(error);
    }
  });
exports.getVoiceEntryByRoomId = getVoiceEntryByRoomId;
