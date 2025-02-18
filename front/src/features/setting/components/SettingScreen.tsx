import { Box, Scaffold, Text } from "_shared";
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { MenuAndItemsT } from "../SettingTypes";
import SettingMenuList from "./menu/SettingMenuList";
import { Helpers } from "_utils";

export default function SettingScreen() {
  const { t } = useTranslation(["common", "setting"]);

  const ALL_MENUS_AND_ITEMS: MenuAndItemsT[] = useMemo(() => {
    return [
      {
        id: 1,
        title: t("setting:menu.menu_general.title"),
        items: [
          {
            id: 1,
            label: t("setting:menu.menu_general.item_language"),
            action: () => console.log("language"),
            defaultValue: "Francais",
          },
          {
            id: 2,
            label: t("setting:menu.menu_general.item_theme"),
            action: () => console.log("theme"),
            defaultValue: "Light",
          },
        ],
      },
    ];
  }, [t]);

  return (
    <Scaffold
      typeOfScreen="tab"
      titleTabScreen={t("common:tab_navigation.label.setting")}
    >
      <Box flex={1} marginTop={"m"}>
        <SettingMenuList menus={ALL_MENUS_AND_ITEMS} />
        <Box alignItems={"center"}>
          <Text variant={"tertiary"}>
            {t("common:content.app_version", {
              versionNumber: Helpers.getAppVersion(),
            })}
          </Text>
        </Box>
      </Box>
    </Scaffold>
  );
}
