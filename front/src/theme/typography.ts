import { Helpers } from "_utils";
import { Platform } from "react-native";
import { human, material } from "react-native-typography";

export const Typography = {
  headerNavigation: Platform.select({
    ios: { ...Helpers.changeColorStyleFromRNTypo(human.largeTitle) },
    android: {
      ...Helpers.changeColorStyleFromRNTypo(material.display2),
      fontWeight: "700",
    },
    default: { ...Helpers.changeColorStyleFromRNTypo(human.largeTitle) },
  }),
  bigTitle: Platform.select({
    ios: { ...Helpers.changeColorStyleFromRNTypo(human.title1) },
    android: { ...Helpers.changeColorStyleFromRNTypo(material.headline) },
    default: { ...Helpers.changeColorStyleFromRNTypo(human.title1) },
  }),
  title: Platform.select({
    ios: { ...Helpers.changeColorStyleFromRNTypo(human.title2) },
    android: { ...Helpers.changeColorStyleFromRNTypo(material.headline) },
    default: { ...Helpers.changeColorStyleFromRNTypo(human.title2) },
  }),
  primary: Platform.select({
    ios: { ...Helpers.changeColorStyleFromRNTypo(human.body) },
    android: { ...Helpers.changeColorStyleFromRNTypo(material.subheading) },
    default: { ...Helpers.changeColorStyleFromRNTypo(human.body) },
  }),
  secondary: Platform.select({
    ios: { ...Helpers.changeColorStyleFromRNTypo(human.subhead) },
    android: { ...Helpers.changeColorStyleFromRNTypo(material.body1) },
    default: { ...Helpers.changeColorStyleFromRNTypo(human.subhead) },
  }),
  primaryBold: Platform.select({
    ios: {
      ...Helpers.changeColorStyleFromRNTypo({
        ...human.body,
        fontWeight: "bold",
      }),
    },
    android: {
      ...Helpers.changeColorStyleFromRNTypo({
        ...material.subheading,
        fontWeight: "bold",
      }),
    },
    default: {
      ...Helpers.changeColorStyleFromRNTypo({
        ...human.body,
        fontWeight: "bold",
      }),
    },
  }),
  tertiary: Platform.select({
    ios: { ...Helpers.changeColorStyleFromRNTypo(human.caption1) },
    android: { ...Helpers.changeColorStyleFromRNTypo(material.body2) },
    default: { ...Helpers.changeColorStyleFromRNTypo(human.caption1) },
  }),
  button: Platform.select({
    ios: { ...Helpers.changeColorStyleFromRNTypo(human.headline) },
    android: { ...Helpers.changeColorStyleFromRNTypo(material.button) },
    default: { ...Helpers.changeColorStyleFromRNTypo(human.headline) },
  }),
  link: Platform.select({
    ios: {
      ...Helpers.changeColorStyleFromRNTypo({
        ...human.subhead,
        textDecorationLine: "underline",
        fontWeight: "600",
      }),
    },
    android: {
      ...Helpers.changeColorStyleFromRNTypo({
        ...material.body1,
        textDecorationLine: "underline",
        fontWeight: "600",
      }),
    },
    default: {
      ...Helpers.changeColorStyleFromRNTypo({
        ...human.subhead,
        textDecorationLine: "underline",
        fontWeight: "600",
      }),
    },
  }),
};
