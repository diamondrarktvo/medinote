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

  @Column({ length: 255, nullable: true })
  title!: string;

  @CreateDateColumn({ type: "timestamp" })
  created_at!: Date;

  @OneToMany(() => VoiceEntry, (voiceEntry) => voiceEntry.room)
  voiceEntries!: VoiceEntry[];
}
