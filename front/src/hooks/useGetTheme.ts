import { useTheme } from "@shopify/restyle";
import { Size, ThemeT } from "_theme";

export const useGetTheme = () => {
  const theme = useTheme<ThemeT>();
  const {
    primary,
    secondary,
    mainBackground,
    mainForeground,
    error,
    white,
    black,
    offWhite,
    text,
    textPrimaryColor,
  } = theme.colors;

  const {
    none: spacingNONE,
    xs: spacingXS,
    s: spacingS,
    m: spacingM,
    l: spacingL,
    xl: spacingXL,
    xxl: spacingXXL,
  } = theme.spacing;

  const {
    none: borderRadiiNONE,
    xs: borderRadiiXS,
    sm: borderRadiiSM,
    md: borderRadiiMD,
    lg: borderRadiiLG,
    xl: borderRadiiXL,
  } = theme.borderRadii;

  const {
    TYPO,
    ICON_LARGE,
    ICON_MEDIUM,
    ICON_SMALL,
    IMAGE_LARGE,
    IMAGE_MEDIUM,
    IMAGE_SMALL,
    DIMENSIONS,
  } = Size;

  return {
    colors: {
      primary,
      secondary,
      mainBackground,
      mainForeground,
      error,
      white,
      black,
      offWhite,
      text,
      textPrimaryColor,
    },
    spacing: {
      spacingNONE,
      spacingXS,
      spacingS,
      spacingM,
      spacingL,
      spacingXL,
      spacingXXL,
    },
    borderRadii: {
      borderRadiiNONE,
      borderRadiiXS,
      borderRadiiSM,
      borderRadiiMD,
      borderRadiiLG,
      borderRadiiXL,
    },
    sizes: {
      TYPO,
      ICON_LARGE,
      ICON_MEDIUM,
      ICON_SMALL,
      IMAGE_LARGE,
      IMAGE_MEDIUM,
      IMAGE_SMALL,
      DIMENSIONS,
    },
  };
};
