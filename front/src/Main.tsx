import { ThemeProvider } from "@shopify/restyle";
import { StackNavigation } from "_navigations";
import { theme, darkTheme } from "_theme";
import { StatusBar } from "react-native";
import { useAppSelector } from "_store";
import { selectors } from "src/features/theme/themeSlice";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

export default function Main() {
  const currentTheme = useAppSelector(selectors.currentTheme);
  return (
    <ThemeProvider theme={currentTheme === "dark" ? darkTheme : theme}>
      <BottomSheetModalProvider>
        <StatusBar backgroundColor={theme.colors.primary} />
        <StackNavigation />
      </BottomSheetModalProvider>
    </ThemeProvider>
  );
}
