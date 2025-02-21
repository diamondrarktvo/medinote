import { Scaffold, Box, BottomSheet, Text, Button, Input } from "_shared";
import { useTranslation } from "react-i18next";
import RoomList from "./room/RoomList";
import {
  useCreateRoomMutation,
  useGetAllRoomsByDeviceQuery,
} from "../RecordingApi";
import { useCallback, useEffect, useRef, useState } from "react";
import { getDeviceId } from "../RecordingUtils";
import { useErrorHandler, useGetTheme } from "_hooks";
import { ErrorResponse, Layouts } from "_utils";
import { FAB } from "@rneui/themed";
import { useFocusEffect } from "@react-navigation/native";
import { BottomSheetModal, useBottomSheetModal } from "@gorhom/bottom-sheet";

export default function RoomScreen() {
  const { t } = useTranslation(["common", "recording"]);
  const [deviceId, setDeviceId] = useState("");
  const [visible, setVisible] = useState(true);
  const { colors, sizes } = useGetTheme();
  const createRoomRef = useRef<BottomSheetModal>(null);
  const [newRoomName, setNewRoomName] = useState("");
  const { dismiss } = useBottomSheetModal();

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

  const [createRoom, { isLoading, error: errorCreateRoom }] =
    useCreateRoomMutation();

  const handleCreateRoom = useCallback(() => {
    if (!deviceId || !newRoomName) return;

    createRoom({ device_id: deviceId, title: newRoomName })
      .unwrap()
      .then((res) => {
        dismiss();
      });
  }, [deviceId, newRoomName]);

  const handleOpenBottomSheet = () => {
    createRoomRef.current?.present();
  };

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
      titleTabScreen={t("common:tab_navigation.label.recording")}
    >
      <Box flex={1} marginTop={"l"}>
        <RoomList rooms={data} refetch={refetch} />

        <FAB
          visible={visible}
          icon={{ name: "add", color: "white" }}
          color={colors.primary}
          placement="right"
          onPress={handleOpenBottomSheet}
        />

        <BottomSheet ref={createRoomRef} snapPoints={[1, "24%"]}>
          <Text variant={"primaryBold"} textAlign={"center"}>
            {t("recording:label.name_room")}
          </Text>
          <Input
            placeholder="ex: Things"
            value={newRoomName}
            onChangeText={(text) => setNewRoomName(text)}
          />
          <Button
            onPress={handleCreateRoom}
            label={t("common:actions.validate")}
            variant="primary"
            width={sizes.DIMENSIONS.width.medium as unknown as number}
            alignSelf={"center"}
            marginTop={"s"}
            loading={isLoading}
          />
        </BottomSheet>
      </Box>
    </Scaffold>
  );
}
