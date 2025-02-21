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
exports.deleteRoom = exports.updateRoom = exports.getRoomByIdAndDevice = exports.getRoomsByDevice = exports.createRoom = void 0;
// src/services/roomService.ts
const Room_1 = require("../entities/Room");
const data_source_1 = require("../config/data-source");
const typeorm_1 = require("typeorm");
const AppError_1 = require("../utils/AppError");
const createRoom = (data) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const roomRepository = data_source_1.AppDataSource.getRepository(Room_1.Room);
        const room = roomRepository.create(data);
        return yield roomRepository.save(room);
    }
    catch (error) {
        if (error instanceof typeorm_1.QueryFailedError &&
            ((_a = error.driverError) === null || _a === void 0 ? void 0 : _a.code) === "ER_DUP_ENTRY") {
            throw new AppError_1.AppError("Room", "La room existe déjà. Veuillez choisir un autre titre.", "ER_DUP_ENTRY");
        }
        throw error;
    }
});
exports.createRoom = createRoom;
const getRoomsByDevice = (deviceId) => __awaiter(void 0, void 0, void 0, function* () {
    const roomRepository = data_source_1.AppDataSource.getRepository(Room_1.Room);
    return yield roomRepository.find({
        where: { device_id: deviceId },
    });
});
exports.getRoomsByDevice = getRoomsByDevice;
const getRoomByIdAndDevice = (id, deviceId) => __awaiter(void 0, void 0, void 0, function* () {
    const roomRepository = data_source_1.AppDataSource.getRepository(Room_1.Room);
    return yield roomRepository.findOne({
        where: { id: id, device_id: deviceId },
        relations: ["voiceEntries"],
    });
});
exports.getRoomByIdAndDevice = getRoomByIdAndDevice;
const updateRoom = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const roomRepository = data_source_1.AppDataSource.getRepository(Room_1.Room);
    const room = yield roomRepository.findOne({ where: { id } });
    if (!room) {
        return null;
    }
    roomRepository.merge(room, updateData);
    return yield roomRepository.save(room);
});
exports.updateRoom = updateRoom;
const deleteRoom = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const roomRepository = data_source_1.AppDataSource.getRepository(Room_1.Room);
    yield roomRepository.delete(id);
});
exports.deleteRoom = deleteRoom;
