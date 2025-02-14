import { Platform } from "react-native";
import { human, material } from "react-native-typography";

export const Typography = {
  headerNavigation: Platform.select({
    ios: { ...human.largeTitle },
    android: { ...material.display4 },
    default: { ...human.largeTitle },
  }),
  bigTitle: Platform.select({
    ios: { ...human.title1 },
    android: { ...material.headline },
    default: { ...human.title1 },
  }),
  title: Platform.select({
    ios: { ...human.title2 },
    android: { ...material.headline },
    default: { ...human.title2 },
  }),
  primary: Platform.select({
    ios: { ...human.body },
    android: { ...material.subheading },
    default: { ...human.body },
  }),
  secondary: Platform.select({
    ios: { ...human.subhead },
    android: { ...material.body1 },
    default: { ...human.subhead },
  }),
  primaryBold: Platform.select({
    ios: { ...human.body, fontWeight: "bold" },
    android: { ...material.subheading, fontWeight: "bold" },
    default: { ...human.body, fontWeight: "bold" },
  }),
  tertiary: Platform.select({
    ios: { ...human.caption1 },
    android: { ...material.body2 },
    default: { ...human.caption1 },
  }),
  button: Platform.select({
    ios: { ...human.headline },
    android: { ...material.button },
    default: { ...human.headline },
  }),
  link: Platform.select({
    ios: {
      ...human.subhead,
      textDecorationLine: "underline",
      fontWeight: "600",
    },
    android: {
      ...material.body1,
      textDecorationLine: "underline",
      fontWeight: "600",
    },
    default: {
      ...human.subhead,
      textDecorationLine: "underline",
      fontWeight: "600",
    },
  }),
};
