import React, { useMemo } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { MoonIcon, SunIcon } from "_assets";
import { useGetTheme } from "_hooks";
import {
  BottomSheet,
  Button,
  Image,
  Row,
  Text,
  TouchableOpacity,
} from "_shared";
import { useTranslation } from "react-i18next";
import { ThemeSupportedT } from "../ThemeTypes";
import { ThemeCodeSupportedT } from "_utils";
import { useAppSelector } from "_store";
import { selectors as themeSelectors } from "../themeSlice";
import { useChangeTheme } from "../hooks/useChangeTheme";

type ThemeSheetProps = {};

const ThemeSheet = React.forwardRef<BottomSheetModal, ThemeSheetProps>(
  (props, ref) => {
    const { t } = useTranslation("common");
    const { sizes } = useGetTheme();
    const currentTheme = useAppSelector(themeSelectors.currentTheme);

    const { setSelected, selected, onConfirm } = useChangeTheme(currentTheme);

    const ALL_THEME_SUPPORTED: ThemeSupportedT[] = useMemo(() => {
      return [
        {
          id: 1,
          code: "light",
          label: t("theme.light"),
          icon: SunIcon,
        },
        {
          id: 2,
          code: "dark",
          label: t("theme.dark"),
          icon: MoonIcon,
        },
      ];
    }, [t]);

    const handleChangeTheme = (themeCode: ThemeCodeSupportedT) => {
      setSelected(themeCode);
    };

    const handleConfirmTheme = () => {
      onConfirm();
    };

    return (
      <BottomSheet ref={ref} snapPoints={[1, "24%"]}>
        <Text variant={"primaryBold"} textAlign={"center"}>
          {t("theme.label_choice")}
        </Text>
        {ALL_THEME_SUPPORTED.map((theme) => (
          <TouchableOpacity
            key={theme.id}
            onPress={() => handleChangeTheme(theme.code)}
          >
            <Row
              justifyContent={"space-between"}
              alignItems={"center"}
              paddingHorizontal={"m"}
              paddingVertical={"s"}
            >
              <Text
                variant={selected === theme.code ? "primaryBold" : "primary"}
                color={selected === theme.code ? "primary" : "black"}
              >
                {theme.label}
              </Text>

              <Image
                source={theme.icon}
                style={{
                  width: sizes.ICON_MEDIUM,
                  height: sizes.ICON_MEDIUM,
                }}
              />
            </Row>
          </TouchableOpacity>
        ))}
        <Button
          onPress={handleConfirmTheme}
          label={t("actions.confirm")}
          variant="primary"
          width={sizes.DIMENSIONS.width.medium as unknown as number}
          alignSelf={"center"}
          marginTop={"s"}
        />
      </BottomSheet>
    );
  },
);

export default ThemeSheet;
