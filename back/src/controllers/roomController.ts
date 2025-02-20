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
    const rooms = await roomService.getAllRooms();
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
    const roomId = parseInt(req.params.id, 10);
    const room = await roomService.getRoomById(roomId);
    if (room) {
      res.json(room);
    } else {
      res.status(404).json({ message: "Room not found" });
    }
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
