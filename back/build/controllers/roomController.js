"use strict";
// src/controllers/roomController.ts
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
exports.deleteRoom = exports.updateRoom = exports.getRoomById = exports.getAllRooms = exports.createRoom = void 0;
const roomService = __importStar(require("../services/roomService"));
const createRoom = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { device_id, title } = req.body;
        const newRoom = yield roomService.createRoom({ device_id, title });
        res.status(201).json({
            success: true,
            message: "Rooms created successfully",
            data: newRoom,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createRoom = createRoom;
const getAllRooms = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deviceId = req.query.device_id;
        if (!deviceId) {
            return res.status(400).json({
                success: false,
                message: "Device ID is required to fetch rooms.",
            });
        }
        const rooms = yield roomService.getRoomsByDevice(deviceId);
        if (rooms.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No rooms found for this device ID.",
            });
        }
        res.status(200).json({
            success: true,
            message: "Rooms retrieved successfully",
            data: rooms,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllRooms = getAllRooms;
const getRoomById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deviceId = req.query.device_id;
        if (!deviceId) {
            return res.status(400).json({
                success: false,
                message: "Device ID is required.",
            });
        }
        const roomId = parseInt(req.params.id, 10);
        const room = yield roomService.getRoomByIdAndDevice(roomId, deviceId);
        if (!room) {
            return res.status(404).json({
                success: false,
                message: "Room not found for this device.",
            });
        }
        res.status(200).json({
            success: true,
            message: "Room retrieved successfully",
            data: room,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getRoomById = getRoomById;
const updateRoom = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roomId = parseInt(req.params.id, 10);
        const updateData = req.body;
        const updatedRoom = yield roomService.updateRoom(roomId, updateData);
        res.status(200).json({
            success: true,
            message: "Rooms updated successfully",
            data: exports.updateRoom,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateRoom = updateRoom;
const deleteRoom = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roomId = parseInt(req.params.id, 10);
        yield roomService.deleteRoom(roomId);
        res.status(204).json({
            success: true,
            message: "Room deleted successfully",
            data: null,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteRoom = deleteRoom;
