import { ThemeCodeSupportedT } from "_utils";
import { ImageSourcePropType } from "react-native";

export type ThemeSupportedT = {
  id: number;
  code: ThemeCodeSupportedT;
  label: string;
  icon: ImageSourcePropType | undefined;
};

export interface ThemeStateI {
  code: ThemeCodeSupportedT;
}
