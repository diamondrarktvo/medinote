import React, { useState, useEffect } from "react";
import { Audio } from "expo-av";
import { Box, Button, Text } from "_shared";
import { DateUtils, Layouts } from "_utils";

interface AudioPlayerProps {
  recordingUrl: string;
  transcription: string;
  summary: string;
  created_at: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  recordingUrl,
  transcription,
  summary,
  created_at,
}) => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Charger le son lors du montage du composant
  useEffect(() => {
    const loadSound = async () => {
      const { sound } = await Audio.Sound.createAsync(
        { uri: recordingUrl },
        { shouldPlay: false },
      );
      setSound(sound);
    };

    loadSound();

    // Nettoyer le son au démontage
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [recordingUrl]);

  const handlePlayPause = async () => {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
        setIsPlaying(false);
      } else {
        await sound.playAsync();
        setIsPlaying(true);
      }
    }
  };

  return (
    <Box>
      <Text
        variant={"tertiary"}
        color={"text"}
        fontSize={Layouts.RFValue(8)}
        marginBottom={"m"}
      >
        {DateUtils.formatDate(created_at)}
      </Text>

      <Button
        variant="primary"
        label={isPlaying ? "Pause" : "Play"}
        onPress={handlePlayPause}
      />

      <Box marginVertical={"m"}>
        <Text
          variant={"primaryBold"}
          fontStyle={"italic"}
          textDecorationLine={"underline"}
        >
          Transcription:
        </Text>
        <Text variant={"tertiary"}>{transcription}</Text>
      </Box>
      <Box>
        <Text
          variant={"primaryBold"}
          fontStyle={"italic"}
          textDecorationLine={"underline"}
        >
          Résumé:
        </Text>
        <Text variant={"tertiary"}>{summary}</Text>
      </Box>
    </Box>
  );
};
