// src/services/roomService.ts
import { Room } from "../entities/Room";

import { AppDataSource } from "../config/data-source";
import { QueryFailedError } from "typeorm";
import { AppError } from "../utils/appError";

export const createRoom = async (data: {
  device_id: string;
  title: string;
}): Promise<Room> => {
  try {
    const roomRepository = AppDataSource.getRepository(Room);
    const room = roomRepository.create(data);
    return await roomRepository.save(room);
  } catch (error: any) {
    if (
      error instanceof QueryFailedError &&
      error.driverError?.code === "ER_DUP_ENTRY"
    ) {
      throw new AppError(
        "Room",
        "La room existe déjà. Veuillez choisir un autre titre.",
        "ER_DUP_ENTRY",
      );
    }
    throw error;
  }
};

export const getRoomsByDevice = async (deviceId: string): Promise<Room[]> => {
  const roomRepository = AppDataSource.getRepository(Room);
  return await roomRepository.find({
    where: { device_id: deviceId },
    relations: ["voiceEntries"],
  });
};

export const getRoomByIdAndDevice = async (
  id: number,
  deviceId: string,
): Promise<Room | null> => {
  const roomRepository = AppDataSource.getRepository(Room);
  return await roomRepository.findOne({
    where: { id: id, device_id: deviceId },
    relations: ["voiceEntries"],
  });
};

export const updateRoom = async (
  id: number,
  updateData: Partial<Room>,
): Promise<Room | null> => {
  const roomRepository = AppDataSource.getRepository(Room);

  const room = await roomRepository.findOne({ where: { id } });
  if (!room) {
    return null;
  }

  roomRepository.merge(room, updateData);

  return await roomRepository.save(room);
};

export const deleteRoom = async (id: number): Promise<void> => {
  const roomRepository = AppDataSource.getRepository(Room);
  await roomRepository.delete(id);
};
