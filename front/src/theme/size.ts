import { SCREEN_HEIGHT, SCREEN_WIDTH } from "_utils";

const [shortDimension, longDimension] =
  SCREEN_WIDTH < SCREEN_HEIGHT
    ? [SCREEN_WIDTH, SCREEN_HEIGHT]
    : [SCREEN_HEIGHT, SCREEN_WIDTH];

const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const _scale = (size: number) => (shortDimension / guidelineBaseWidth) * size;
const verticalScale = (size: number) =>
  (longDimension / guidelineBaseHeight) * size;
const moderateScale = (size: number, factor = 0.5) =>
  size + (_scale(size) - size) * factor;

const isTablet = false;
const scale = isTablet ? verticalScale : _scale;

const TYPO = {
  veryBig: 40,
  big: 24,
  primary: 18,
  secondary: 16,
  tertiary: 14,
  verySmall: 12,
};

const ICON_SMALL = moderateScale(20);
const ICON_MEDIUM = moderateScale(30);
const ICON_LARGE = moderateScale(40);

const IMAGE_SMALL = moderateScale(50);
const IMAGE_MEDIUM = moderateScale(100);
const IMAGE_LARGE = moderateScale(150);

const DIMENSIONS = {
  height: {
    xsmall: "25%",
    medium: "50%",
    large: "75%",
    full: "100%",
  },
  width: {
    small: "25%",
    medium: "50%",
    large: "75%",
    full: "100%",
  },
};

export const Size = {
  TYPO,
  ICON_SMALL,
  ICON_MEDIUM,
  ICON_LARGE,
  IMAGE_SMALL,
  IMAGE_MEDIUM,
  IMAGE_LARGE,
  DIMENSIONS,
};
