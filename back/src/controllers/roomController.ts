// src/controllers/roomController.ts

import { Request, Response, NextFunction } from "express";
import * as roomService from "../services/roomService";

export const createRoom = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { device_id, title } = req.body;
    const newRoom = await roomService.createRoom({ device_id, title });
    res.status(201).json(newRoom);
  } catch (error) {
    next(error);
  }
};

export const getAllRooms = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const deviceId = req.query.device_id as string;
    if (!deviceId) {
      return res.status(400).json({
        success: false,
        message: "Device ID is required to fetch rooms.",
      });
    }
    const rooms = await roomService.getRoomsByDevice(deviceId);
    if (rooms.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No rooms found for this device ID.",
      });
    }
    res.json(rooms);
  } catch (error) {
    next(error);
  }
};

export const getRoomById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const deviceId = req.query.device_id as string;
    if (!deviceId) {
      return res.status(400).json({
        success: false,
        message: "Device ID is required.",
      });
    }
    const roomId = parseInt(req.params.id, 10);
    const room = await roomService.getRoomByIdAndDevice(roomId, deviceId);
    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found for this device.",
      });
    }
    res.json({ success: true, room });
  } catch (error) {
    next(error);
  }
};

export const updateRoom = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const roomId = parseInt(req.params.id, 10);
    const updateData = req.body;
    const updatedRoom = await roomService.updateRoom(roomId, updateData);
    res.json(updatedRoom);
  } catch (error) {
    next(error);
  }
};

export const deleteRoom = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const roomId = parseInt(req.params.id, 10);
    await roomService.deleteRoom(roomId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
