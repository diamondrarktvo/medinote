import React from "react";

import { FlashList } from "@shopify/flash-list";
import { EmptyList } from "_shared";
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
      renderItem={RenderRoomItem}
      extraData={rooms}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={<EmptyList textToShow={t("content.empty_room")} />}
    />
  );
};

export default RoomList;
