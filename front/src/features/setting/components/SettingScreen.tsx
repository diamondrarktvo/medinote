import { useTheme } from "@shopify/restyle";
import { Scaffold, Text } from "_shared";
import { Size, ThemeT } from "_theme";

export default function SettingScreen() {
  const theme = useTheme<ThemeT>();
  const { colors, sizes } = theme;

  return (
    <Scaffold typeOfScreen="tab">
      <Text>SettingScreen</Text>
    </Scaffold>
  );
}
