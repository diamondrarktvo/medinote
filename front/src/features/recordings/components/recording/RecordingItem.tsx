import React from "react";
import { Box, STYLES } from "_shared";
import { ListRenderItem } from "@shopify/flash-list";
import { VoiceT } from "../../RecordingTypes";
import { AudioPlayer } from "./AudioPlayer";

const RecordingItem: ListRenderItem<VoiceT> = ({ item }) => {
  return (
    <Box
      key={item.id}
      flex={1}
      marginBottom={"m"}
      style={STYLES.card_shadow}
      paddingVertical={"m"}
      paddingHorizontal={"l"}
      marginHorizontal={"s"}
      marginVertical={"s"}
    >
      <AudioPlayer
        recordingUrl={item.recording_url}
        summary={item.summary}
        transcription={item.transcription}
        created_at={item.created_at}
      />
    </Box>
  );
};

export default RecordingItem;
