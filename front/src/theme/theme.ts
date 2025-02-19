import { createTheme } from "@shopify/restyle";
import { Size } from "./size";
import { Typography } from "./typography";

const palette = {
  // Couleurs pour le thème clair
  lightWhite: "#FFFFFF",
  lightGrey: "#F0F0F0",
  darkGrey: "#333333",
  primaryBlue: "#4A90E2",
  secondaryBlue: "#8FC1F3",
  errorRed: "#D0021B",
  overlayBackground: "rgba(0, 0, 0, 0.65)",

  // Couleurs pour le thème sombre
  darkBackground: "#121212",
  darkForeground: "#E0E0E0",
  darkPrimary: "#4A90E2",
  darkSecondary: "#356AC3",
  darkError: "#FF4C4C",
  darkOverlayBackground: "rgba(255, 255, 255, 0.65)",

  transparent: "transparent",
};

const theme = createTheme({
  colors: {
    mainBackground: palette.lightWhite,
    mainForeground: palette.darkGrey,
    primary: palette.primaryBlue,
    secondary: palette.secondaryBlue,
    error: palette.errorRed,
    white: palette.lightWhite,
    black: palette.darkGrey,
    offWhite: palette.lightGrey,
    buttonPrimaryBackground: palette.primaryBlue,
    buttonSecondaryBackground: palette.secondaryBlue,
    cardPrimaryBackground: palette.lightWhite,
    cardLightBackground: palette.lightGrey,
    text: palette.darkGrey,
    textPrimaryColor: palette.primaryBlue,
    overlayBackground: palette.overlayBackground,
    transparent: palette.transparent,
  },
  spacing: {
    none: 0,
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 40,
  },
  sizes: {
    ...Size.DIMENSIONS,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
    largeTablet: 1024,
  },
  borderRadii: {
    none: 0,
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  textVariants: {
    ...Typography,
    button: {
      ...Typography.button,
      fontSize: 16,
      color: "white",
      textAlign: "center",
    },
    defaults: {
      fontSize: 14,
      color: "text",
    },
  },
  buttonVariants: {
    primary: {
      backgroundColor: "primary",
      color: "white",
      paddingVertical: "m",
      paddingHorizontal: "l",
      borderRadius: "sm",
    },
    secondary: {
      backgroundColor: "buttonSecondaryBackground",
      color: "white",
      paddingVertical: "m",
      paddingHorizontal: "l",
      borderRadius: "sm",
    },
    tertiary: {
      backgroundColor: "white",
      color: "black",
      borderColor: "buttonSecondaryBackground",
      paddingVertical: "m",
      paddingHorizontal: "l",
      borderRadius: "sm",
      borderWidth: 1,
    },
  },
});

const darkTheme = createTheme({
  ...theme,
  colors: {
    ...theme.colors,
    mainBackground: palette.darkBackground,
    mainForeground: palette.darkForeground,
    primary: palette.darkPrimary,
    secondary: palette.darkSecondary,
    error: palette.darkError,
    white: palette.darkForeground,
    black: palette.darkBackground,
    text: palette.darkForeground,
    overlayBackground: palette.darkOverlayBackground,
  },
});

export type ThemeT = typeof theme;
export { theme, darkTheme };
