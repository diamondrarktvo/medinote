// src/entities/Room.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import { VoiceEntry } from "./VoiceEntry";

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 255 })
  device_id!: string;

  @Column({ length: 255, unique: true })
  title!: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at!: Date;

  @OneToMany(() => VoiceEntry, (voiceEntry) => voiceEntry.room, {
    cascade: true,
  })
  voiceEntries!: VoiceEntry[];
}
