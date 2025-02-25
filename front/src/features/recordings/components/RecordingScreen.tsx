import { Scaffold, Box } from "_shared";
import { useTranslation } from "react-i18next";
import RecordingList from "./recording/RecordingList";
import { useGetAllVoicesByRoomQuery } from "../RecordingApi";
import { useCallback } from "react";
import { useErrorHandler } from "_hooks";
import { ErrorResponse } from "_utils";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import VoiceRecorder from "./recording/RecordingButton";

export default function RecordingScreen() {
  const { room_id } = useRoute().params as {
    room_id: number;
  };

  const { t } = useTranslation("common");

  const { data, error, refetch, isUninitialized, isLoading, isFetching } =
    useGetAllVoicesByRoomQuery(
      {
        room_id: room_id,
      },
      {
        skip: !room_id,
        refetchOnFocus: true,
        refetchOnReconnect: true,
        refetchOnMountOrArgChange: true,
      },
    );

  useFocusEffect(
    useCallback(() => {
      if (!isUninitialized && refetch) {
        refetch();
      }
    }, [isUninitialized, refetch]),
  );

  useErrorHandler(error as ErrorResponse);

  return (
    <Scaffold
      typeOfScreen="tab"
      titleTabScreen={t("tab_navigation.label.recording")}
    >
      <Box flex={1} marginTop={"l"}>
        <RecordingList voices={data} refetch={refetch} />

        <VoiceRecorder room_id={room_id} />
      </Box>
    </Scaffold>
  );
}
