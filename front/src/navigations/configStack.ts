import { CardStyleInterpolators } from "@react-navigation/stack";
import { Easing } from "react-native";
import { StackNavigationConfig } from "./types";
import { TransitionSpec } from "@react-navigation/stack/lib/typescript/commonjs/src/types";

//config for transitionSpec
const transitionConfig: TransitionSpec = {
  animation: "timing",
  config: {
    duration: 60,
    easing: Easing.linear,
  },
};

export const stackNavigationConfig: StackNavigationConfig = {
  screenOptionsForDisplayedHeader: {
    headerShown: true,
    gestureEnabled: true,
    //CardStyleInterpolators est utile pour regler la transition durant le changement de screen, gestureEnabled doit être activé | gestureDirection peut aussi le faire|
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, //on utilise la transition par défaut de IOS
    transitionSpec: {
      open: transitionConfig,
      close: transitionConfig,
    },
    headerTitleAlign: "center",
  },
  screenOptionsForHiddenHeader: {
    headerShown: false,
  },
  //screenOptionsTransparentHeader: {},
};
