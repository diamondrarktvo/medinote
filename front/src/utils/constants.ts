import { Dimensions } from "react-native";
import { LanguageSupportedT } from "./Types";

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
  Dimensions.get("window");

export const SUPPORTED_LANGUAGES: LanguageSupportedT[] = ["en", "fr"];
