import { useTheme } from "@shopify/restyle";
import { StyleSheet } from "react-native";
import { Scaffold, Text, Box } from "_shared";
import { Size, ThemeT } from "_theme";

export default function RecordingScreen() {
  const theme = useTheme<ThemeT>();
  const { colors, sizes } = theme;

  return (
    <Scaffold typeOfScreen="tab" titleTabScreen="Météo du jour">
      <Box flex={1} justifyContent={"space-between"}>
        <Text>VoiceAnalysisScreen</Text>
      </Box>
    </Scaffold>
  );
}
