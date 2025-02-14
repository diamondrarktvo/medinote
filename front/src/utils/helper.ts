import { PixelRatio, Platform, StatusBar } from "react-native";
import moment from "moment";
import { isIphoneX } from "react-native-iphone-x-helper";
import Toast from "react-native-toast-message";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "./constants";

/**
 *
 * @param inputDate
 * @returns
 */
const formatDateToString = (inputDate: string | Date) => {
  const options: {} = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const date = new Date(inputDate);
  const formattedDate = date.toLocaleDateString("fr-FR", options);
  return formattedDate;
};

/**
 *
 * @param dateString
 * @returns
 */
function formatDate(dateString: string) {
  const now = new Date();
  return moment(dateString || now).format("DD-MM-YYYY");
}

function formatTime(dateString: string) {
  const now = new Date();
  return moment(dateString || now).format("HH:mm");
}

// Fonction pour convertir le pourcentage de la largeur de l'écran en un nombre de pixels
/**
 *
 * @param widthPercent
 * @returns
 */
const widthPercentageToDP = (widthPercent: number | string) => {
  const elemWidth =
    typeof widthPercent === "number" ? widthPercent : parseFloat(widthPercent);

  return PixelRatio.roundToNearestPixel((SCREEN_WIDTH * elemWidth) / 100);
};

/**
 *
 * @param heightPercent
 * @returns
 */
const heightPercentageToDP = (heightPercent: number | string) => {
  const elemHeight =
    typeof heightPercent === "number"
      ? heightPercent
      : parseFloat(heightPercent);

  return PixelRatio.roundToNearestPixel((SCREEN_HEIGHT * elemHeight) / 100);
};

// Fonction pour ajuster la taille d'un composant selon le width de l'écran
/**
 *
 * @param size
 * @returns
 */
const scalePerWidth = (size: number) => {
  const elemWidth = typeof size === "number" ? size : parseFloat(size);
  return PixelRatio.roundToNearestPixel(elemWidth);
};

// Fonction pour ajuster la taille d'un composant selon la taille de l'écran
/**
 *
 * @param size
 * @returns
 */
const scalePerHeight = (size: number) => {
  const elemHeight = typeof size === "number" ? size : parseFloat(size);
  return PixelRatio.roundToNearestPixel(elemHeight);
};

function RFValue(fontSize: number, standardScreenHeight = 680) {
  const standardLength =
    SCREEN_WIDTH > SCREEN_HEIGHT ? SCREEN_WIDTH : SCREEN_HEIGHT;
  const offset: number =
    SCREEN_WIDTH > SCREEN_HEIGHT
      ? 0
      : Platform.OS === "ios"
        ? 78
        : (StatusBar.currentHeight ?? 0); // iPhone X style SafeAreaView size in portrait

  const deviceHeight =
    isIphoneX() || Platform.OS === "android"
      ? standardLength - offset
      : standardLength;

  const heightPercent = (fontSize * deviceHeight) / standardScreenHeight;
  return Math.round(heightPercent);
}

/**
 *
 * @param valueForIos
 * @param valueForAndroid
 * @returns
 */
const specificValueForIos = (valueForIos: number, valueForAndroid: number) => {
  if (Platform.OS === "ios") {
    return valueForIos;
  }
  return valueForAndroid;
};

type ResponsiveSize = "none" | "xxs" | "xs" | "s" | "m" | "l" | "xl" | "xxl";

/**
 *
 * @param valueForIos
 * @param valueForAndroid
 * @returns
 */
const specificValueRelativeToThemeForIos = (
  valueForIos: ResponsiveSize,
  valueForAndroid: ResponsiveSize,
): ResponsiveSize => {
  if (Platform.OS === "ios") {
    return valueForIos;
  }
  return valueForAndroid;
};

/**
 *
 * @param type
 * @param text1
 * @param text2
 */
const showToast = (
  type: "success" | "error" | "info",
  text1?: string | undefined,
  text2?: string | undefined,
) => {
  Toast.show({
    type,
    text1: text1,
    text2: text2,
    position: "top",
    visibilityTime: 4000,
  });
};

const isTablet = () => {
  const smallestDimension = Math.min(SCREEN_WIDTH, SCREEN_HEIGHT);
  return smallestDimension >= 600;
};

export const Layouts = {
  widthPercentageToDP,
  heightPercentageToDP,
  scalePerWidth,
  scalePerHeight,
  RFValue,
  specificValueForIos,
  specificValueRelativeToThemeForIos,
  isTablet,
};

export const DateUtils = {
  formatDate,
  formatDateToString,
  formatTime,
};

export const Helpers = {
  showToast,
};
