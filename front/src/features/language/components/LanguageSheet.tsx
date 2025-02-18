import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useTheme } from "@shopify/restyle";
import { EnglishIcon, FrenchIcon } from "_assets";
import { useGetTheme } from "_hooks";
import { BottomSheet, Box, Image, Row, Text } from "_shared";
import { ThemeT } from "_theme";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

const LanguageSheet = () => {
  const handleLanguageRef = useRef<BottomSheetModalMethods>(null);
  const { t } = useTranslation("common");
  const { sizes } = useGetTheme();

  const ALL_LANGUAGE_SUPPORTED = [
    {
      id: 1,
      label: t("language.français"),
      icon: FrenchIcon,
    },
    {
      id: 2,
      label: t("language.english"),
      icon: EnglishIcon,
    },
  ];

  return (
    <BottomSheet ref={handleLanguageRef}>
      <Box flex={1}>
        {ALL_LANGUAGE_SUPPORTED.map((language) => (
          <Row justifyContent={"space-between"} key={language.id}>
            <Text variant={"primaryBold"}>{language.label}</Text>

            <Image
              source={language.icon}
              width={sizes.ICON_MEDIUM}
              height={sizes.ICON_MEDIUM}
            />
          </Row>
        ))}
      </Box>
    </BottomSheet>
  );
};

export { LanguageSheet };
