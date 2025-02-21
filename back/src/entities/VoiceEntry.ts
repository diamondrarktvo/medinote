import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Room } from "./Room";

@Entity()
export class VoiceEntry {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 255 })
  recording_url!: string;

  @Column({ type: "text", nullable: true })
  transcription!: string;

  @Column({ type: "text", nullable: true })
  summary!: string;

  // Utilisez @Column au lieu de @CreateDateColumn
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at!: Date;

  @ManyToOne(() => Room, (room) => room.voiceEntries, { onDelete: "CASCADE" })
  room!: Room;
}
