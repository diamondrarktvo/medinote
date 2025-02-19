import React, { useMemo } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { EnglishIcon, FrenchIcon } from "_assets";
import { useGetTheme } from "_hooks";
import {
  BottomSheet,
  Box,
  Button,
  Image,
  Row,
  Text,
  TouchableOpacity,
} from "_shared";
import { useTranslation } from "react-i18next";
import { AllLanguageSupportedT } from "../LanguageTypes";
import { useChangeLanguage } from "../hooks/useChangeLanguage";
import { LanguageCodeSupportedT } from "_utils";

type LanguageSheetProps = {};

const LanguageSheet = React.forwardRef<BottomSheetModal, LanguageSheetProps>(
  (props, ref) => {
    const {
      t,
      i18n: { language: currentLanguage },
    } = useTranslation("common");
    const { sizes } = useGetTheme();

    const { setSelected, selected, onConfirm } = useChangeLanguage(
      currentLanguage as LanguageCodeSupportedT,
    );

    const ALL_LANGUAGE_SUPPORTED: AllLanguageSupportedT[] = useMemo(() => {
      return [
        {
          id: 1,
          code: "fr",
          label: t("language.fr"),
          icon: FrenchIcon,
        },
        {
          id: 2,
          code: "en",
          label: t("language.en"),
          icon: EnglishIcon,
        },
      ];
    }, [t]);

    const handleChangeLanguage = (languageCode: LanguageCodeSupportedT) => {
      setSelected(languageCode);
    };

    const handleConfirmLanguage = () => {
      onConfirm();
    };

    return (
      <BottomSheet ref={ref} snapPoints={[1, "24%"]}>
        <Text variant={"primaryBold"} textAlign={"center"}>
          {t("language.label_choice")}
        </Text>
        {ALL_LANGUAGE_SUPPORTED.map((language) => (
          <TouchableOpacity
            key={language.id}
            onPress={() => handleChangeLanguage(language.code)}
          >
            <Row
              justifyContent={"space-between"}
              alignItems={"center"}
              paddingHorizontal={"m"}
              paddingVertical={"s"}
            >
              <Text
                variant={selected === language.code ? "primaryBold" : "primary"}
                color={selected === language.code ? "primary" : "black"}
              >
                {language.label}
              </Text>

              <Image
                source={language.icon}
                style={{
                  width: sizes.ICON_MEDIUM,
                  height: sizes.ICON_MEDIUM,
                }}
              />
            </Row>
          </TouchableOpacity>
        ))}
        <Button
          onPress={handleConfirmLanguage}
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

export default LanguageSheet;
