import React from "react";

import { FlashList } from "@shopify/flash-list";
import { EmptyList } from "_shared";
import { useTranslation } from "react-i18next";
import { VoiceT } from "../../RecordingTypes";
import { RefreshControl } from "react-native-gesture-handler";
import RecordingItem from "./RecordingItem";

const RecordingList: React.FC<{
  voices: VoiceT[] | undefined;
  refetch: () => void;
}> = ({ voices, refetch }) => {
  const { t } = useTranslation("common");

  return (
    <FlashList
      keyExtractor={(item) => item.id.toString()}
      estimatedItemSize={200}
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={refetch} enabled={true} />
      }
      data={voices}
      renderItem={RecordingItem}
      extraData={voices}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={
        <EmptyList textToShow={t("content.emmty_voice_record")} />
      }
    />
  );
};

export default RecordingList;
