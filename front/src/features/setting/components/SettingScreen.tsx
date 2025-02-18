import { useTheme } from "@shopify/restyle";
import { Box, Scaffold, Text } from "_shared";
import { Size, ThemeT } from "_theme";
import { useTranslation } from "react-i18next";

export default function SettingScreen() {
  const { t } = useTranslation("common");
  const theme = useTheme<ThemeT>();
  const { colors, sizes } = theme;

  return (
    <Scaffold
      typeOfScreen="tab"
      titleTabScreen={t("tab_navigation.label.setting")}
    >
      <Box flex={1} justifyContent={"space-between"}>
        <Text>VoiceAnalysisScreen</Text>
      </Box>
    </Scaffold>
  );
}
