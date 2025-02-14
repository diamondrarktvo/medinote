//IMPORT FROM NODE_MODULES
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//LOCAL IMPORT
import { TabParamList, TabRouteTypes } from "./types";
import { useTheme } from "@shopify/restyle";
import { ThemeT } from "_theme";
import { VoiceAnalysisScreen, SettingScreen } from "_features";
import { Icon } from "_shared";
import { Layouts } from "_utils";

const Tab = createBottomTabNavigator<TabParamList>();

//routes
const TABROUTES: TabRouteTypes[] = [
  {
    name: "voice_analysis_screen",
    component: VoiceAnalysisScreen,
    tabLabel: "Accueil",
    icon: "home",
  },
  {
    name: "setting_screen",
    component: SettingScreen,
    tabLabel: "Recherche",
    icon: "search",
  },
];

const TabNavigation = () => {
  const theme = useTheme<ThemeT>();
  const { primary, mainForeground, mainBackground, white } = theme.colors;
  return (
    <Tab.Navigator
      initialRouteName="voice_analysis_screen"
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarStyle: [{ backgroundColor: mainBackground }],
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
            tabBarActiveBackgroundColor: primary,
            tabBarIcon: ({ focused, color }) => (
              <Icon
                name={route.icon}
                color={focused ? white : primary}
                size={focused ? Layouts.RFValue(18) : Layouts.RFValue(16)}
              />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default TabNavigation;
