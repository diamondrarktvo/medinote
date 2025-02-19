import { LanguageCodeSupportedT } from "_utils";
import { ImageSourcePropType } from "react-native";

export type AllLanguageSupportedT = {
  id: number;
  code: LanguageCodeSupportedT;
  label: string;
  icon: ImageSourcePropType | undefined;
};
