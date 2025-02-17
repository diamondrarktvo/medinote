//IMPORT FROM NODE_MODULES
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//LOCAL IMPORT
import { TabParamList, TabRouteTypes } from "./types";
import { useTheme } from "@shopify/restyle";
import { ThemeT } from "_theme";
import { RecordingScreen, SettingScreen } from "_features";
import { Icon, Text } from "_shared";
import { Layouts } from "_utils";

const Tab = createBottomTabNavigator<TabParamList>();

//routes
const TABROUTES: TabRouteTypes[] = [
  {
    name: "voice_analysis_screen",
    component: RecordingScreen,
    tabLabel: "Recording",
    icon: "record-voice-over",
  },
  {
    name: "setting_screen",
    component: SettingScreen,
    tabLabel: "Paramètre",
    icon: "settings",
  },
];

const TabNavigation = () => {
  const theme = useTheme<ThemeT>();
  const { primary, mainForeground, mainBackground, black, transparent } =
    theme.colors;
  return (
    <Tab.Navigator
      initialRouteName="voice_analysis_screen"
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: [
          {
            height: Layouts.heightPercentageToDP(7),
          },
        ],
      }}
    >
      {TABROUTES.map((route) => (
        <Tab.Screen
          key={route.name}
          name={route.name}
          component={route.component}
          options={{
            title: route.tabLabel,
            tabBarActiveTintColor: primary,
            tabBarInactiveTintColor: mainForeground,
            tabBarIcon: ({ focused }) => (
              <Icon
                name={route.icon}
                color={focused ? primary : black}
                size={focused ? Layouts.RFValue(20) : Layouts.RFValue(16)}
              />
            ),
            tabBarLabel: ({ focused }) => (
              <Text
                variant={focused ? "primaryBold" : "primary"}
                color={focused ? "primary" : "black"}
              >
                {route.tabLabel}
              </Text>
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default TabNavigation;
