import React from "react";
import { MenuAndItemsT } from "../../SettingTypes";
import { FlashList } from "@shopify/flash-list";
import { Box, EmptyList } from "_shared";
import { useTranslation } from "react-i18next";
import RenderSettingMenuItem from "./SettingMenuItem";

const SettingMenuList: React.FC<{ menus: MenuAndItemsT[] }> = ({ menus }) => {
  const { t } = useTranslation("common");

  return (
    <FlashList
      keyExtractor={(item) => item.id.toString()}
      estimatedItemSize={200}
      data={menus}
      renderItem={RenderSettingMenuItem}
      extraData={menus}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={<EmptyList textToShow={t("content.empty_menu")} />}
    />
  );
};

export default SettingMenuList;
