import React from "react";

import { FlashList } from "@shopify/flash-list";
import { Box, EmptyList } from "_shared";
import { useTranslation } from "react-i18next";
import { RoomT } from "../../RecordingTypes";
import RenderRoomItem from "./RoomItem";
import { RefreshControl } from "react-native-gesture-handler";

const RoomList: React.FC<{
  rooms: RoomT[] | undefined;
  refetch: () => void;
}> = ({ rooms, refetch }) => {
  const { t } = useTranslation("common");

  return (
    <FlashList
      keyExtractor={(item) => item.id.toString()}
      estimatedItemSize={200}
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={refetch} enabled={true} />
      }
      data={rooms}
      renderItem={({ item }) => <RenderRoomItem item={item} />}
      extraData={rooms}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={
        <Box flex={1} justifyContent={"center"} alignItems={"center"}>
          <EmptyList textToShow={t("content.empty_room")} />
        </Box>
      }
    />
  );
};

export default RoomList;
