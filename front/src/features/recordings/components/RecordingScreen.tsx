import { Scaffold, Box } from "_shared";
import { useTranslation } from "react-i18next";
import RoomList from "./room/RoomList";
import { useGetAllRoomsByDeviceQuery } from "../RecordingApi";
import { useCallback, useEffect, useState } from "react";
import { getDeviceId } from "../RecordingUtils";
import { useErrorHandler } from "_hooks";
import { ErrorResponse } from "_utils";
import { useFocusEffect } from "@react-navigation/native";

export default function RecordingScreen() {
  const { t } = useTranslation("common");
  const [deviceId, setDeviceId] = useState("");

  const { data, error, refetch, isUninitialized } = useGetAllRoomsByDeviceQuery(
    {
      device_id: deviceId,
    },
    {
      skip: !deviceId,
      refetchOnFocus: true,
      refetchOnReconnect: false,
      refetchOnMountOrArgChange: true,
    },
  );

  useEffect(() => {
    getDeviceId().then((res) => {
      if (res) {
        setDeviceId(res);
      }
    });
  }, []);

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
        <RoomList rooms={data} refetch={refetch} />
      </Box>
    </Scaffold>
  );
}
