export type RoomT = {
  id: number;
  device_id: string;
  title: string;
  created_at: string;
};

export type VoiceT = {
  id: number;
  recording_url: string;
  transcription: string;
  summary: string;
  created_at: string;
  room: RoomT;
};
