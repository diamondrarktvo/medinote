import { ThemeProvider } from "@shopify/restyle";
import { StackNavigation } from "_navigations";
import { theme, darkTheme } from "_theme";
import { StatusBar } from "react-native";
import { useAppSelector } from "./store";
import { selectors } from "src/features/theme/themeSlice";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import Toast from "react-native-toast-message";

import {
  ErrorToast,
  InfoToast,
  SuccessToast,
  ToastProps,
} from "react-native-toast-message";
import { Platform } from "react-native";
import { Layouts } from "_utils";

export default function Main() {
  const currentTheme = useAppSelector(selectors.currentTheme);
  const toastConfig = {
    success: (props: ToastProps) => (
      <SuccessToast
        {...props}
        style={{
          borderLeftColor: theme.colors.primary,
          marginTop: Layouts.RFValue(Platform.OS === "ios" ? 18 : 10),
        }}
      />
    ),
    error: (props: ToastProps) => (
      <ErrorToast
        {...props}
        text2NumberOfLines={2}
        style={{
          borderLeftColor: theme.colors.error,
          marginTop: Layouts.RFValue(Platform.OS === "ios" ? 18 : 10),
        }}
      />
    ),
    info: (props: ToastProps) => (
      <InfoToast
        {...props}
        text2NumberOfLines={2}
        style={{
          borderLeftColor: theme.colors.secondary,
          marginTop: Layouts.RFValue(Platform.OS === "ios" ? 18 : 10),
        }}
      />
    ),
  };

  return (
    <ThemeProvider theme={currentTheme === "dark" ? darkTheme : theme}>
      <BottomSheetModalProvider>
        <StatusBar backgroundColor={theme.colors.primary} />
        <StackNavigation />
        <Toast config={toastConfig} />
      </BottomSheetModalProvider>
    </ThemeProvider>
  );
}
