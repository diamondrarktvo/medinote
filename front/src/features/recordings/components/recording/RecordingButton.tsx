import React, { useState, useEffect } from "react";
import { Audio } from "expo-av";
import { useSendRecordMutation } from "../../RecordingApi";
import { Box, Button, Text } from "_shared";
import { StyleSheet } from "react-native";
import { Helpers } from "_utils";

const VoiceRecorder: React.FC<{ room_id: number }> = ({ room_id }) => {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  const [sendRecord, { isLoading, error }] = useSendRecordMutation();

  // Démarrer l'enregistrement
  const startRecording = async () => {
    try {
      const permission = await Audio.requestPermissionsAsync();
      if (permission.status !== "granted") {
        Helpers.showToast("info", "Microphone access is required.");
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const newRecording = new Audio.Recording();
      await newRecording.prepareToRecordAsync(
        // @ts-ignore
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY,
      );
      await newRecording.startAsync();
      setRecording(newRecording);
      setIsRecording(true);
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };

  // Arrêter l'enregistrement
  const stopRecording = async (): Promise<string | undefined | null> => {
    if (!recording) return;
    try {
      await recording.stopAndUnloadAsync();

      const uri = recording.getURI();

      setIsRecording(false);

      return uri;
    } catch (err) {
      console.error("Failed to stop recording", err);
    }
  };

  // Gestion du bouton d'enregistrement
  const handleRecordPress = async () => {
    if (isRecording) {
      const uri = await stopRecording();
      if (uri) {
        // Extraire le nom du fichier à partir de l'URI
        const fileName = Helpers.extractFileInfo(uri).fileName;

        // Déduire le content-type en fonction de l'extension
        const contentType =
          Helpers.extractFileInfo(uri).content_type ||
          "application/octet-stream";

        // Envoyer l'enregistrement via la mutation RTK Query
        sendRecord({
          audio: {
            uri: uri,
            name: fileName,
            content_type: contentType,
          },
          roomId: room_id,
        })
          .unwrap()
          .then(() => {
            Helpers.showToast("success", "Vocale transcrit avec succès.");
          })
          .catch((err) => {
            console.error(err);
            Helpers.showToast("error", "Failed to send recording.");
          });
      }
    } else {
      await startRecording();
    }
  };

  if (error) {
    // @ts-ignore
    Helpers.showToast("error", error.error || error.message);
  }

  return (
    <Box style={styles.container}>
      <Button
        variant="primary"
        label={isRecording ? "Stop Recording" : "Start Recording"}
        onPress={handleRecordPress}
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: "center",
  },
  text: {
    marginTop: 10,
    fontSize: 16,
  },
  error: {
    marginTop: 10,
    fontSize: 16,
    color: "red",
  },
});

export default VoiceRecorder;
