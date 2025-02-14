import { useState } from "react";
import { ThemeProvider } from "@shopify/restyle";
import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StackNavigation } from "_navigations";
import { theme, darkTheme } from "_theme";
import { StatusBar } from "react-native";
import { Provider } from "react-redux";
import { store } from "_store";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  return (
    <Provider store={store}>
      <ThemeProvider theme={isDarkMode ? darkTheme : theme}>
        <SafeAreaProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <StatusBar backgroundColor={theme.colors.primary} />
            <StackNavigation />
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </ThemeProvider>
    </Provider>
  );
}
