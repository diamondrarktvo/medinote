import { Box, Scaffold, Text } from "_shared";
import { useCallback, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { MenuAndItemsT } from "../SettingTypes";
import SettingMenuList from "./menu/SettingMenuList";
import { Helpers, LanguageCodeSupportedT } from "_utils";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { LanguageSheet } from "../../language";
import { ThemeSheet } from "../../theme";
import { useAppSelector } from "_store";
import { selectors as themeSelectors } from "../../theme/themeSlice";

export default function SettingScreen() {
  const {
    t,
    i18n: { language: currentLanguage },
  } = useTranslation(["common", "setting"]);

  const languageRef = useRef<BottomSheetModal>(null);
  const themeRef = useRef<BottomSheetModal>(null);
  const currentTheme = useAppSelector(themeSelectors.currentTheme);

  console.log("currentLanguage", currentLanguage);

  const ALL_MENUS_AND_ITEMS: MenuAndItemsT[] = useMemo(() => {
    return [
      {
        id: 1,
        title: t("setting:menu.menu_general.title"),
        items: [
          {
            id: 1,
            label: t("setting:menu.menu_general.item_language"),
            action: () => handleOpenLanguageSheet(),
            defaultValue: t(
              `common:language.${currentLanguage as LanguageCodeSupportedT}`,
            ),
          },
          {
            id: 2,
            label: t("setting:menu.menu_general.item_theme"),
            action: () => handleOpenThemeSheet(),
            defaultValue: t(`common:theme.${currentTheme}`),
          },
        ],
      },
    ];
  }, [t, languageRef, themeRef, currentLanguage, currentTheme]);

  const handleOpenLanguageSheet = useCallback(() => {
    languageRef.current?.present();
  }, [languageRef]);

  const handleOpenThemeSheet = useCallback(() => {
    themeRef.current?.present();
  }, [themeRef]);

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

      <LanguageSheet ref={languageRef} />
      <ThemeSheet ref={themeRef} />
    </Scaffold>
  );
}
