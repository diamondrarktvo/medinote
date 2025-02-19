import { Dimensions } from "react-native";
import { LanguageCodeSupportedT, ThemeCodeSupportedT } from "./Types";

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
  Dimensions.get("window");

export const SUPPORTED_LANGUAGES: LanguageCodeSupportedT[] = ["en", "fr"];
