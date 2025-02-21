//IMPORT FROM NODE_MODULES
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//LOCAL IMPORT
import { TabParamList, TabRouteTypes } from "./types";
import { useTheme } from "@shopify/restyle";
import { ThemeT } from "_theme";
import { RoomScreen, SettingScreen } from "_features";
import { Icon, Text } from "_shared";
import { Layouts } from "_utils";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigation = () => {
  const { t } = useTranslation("common");
  const theme = useTheme<ThemeT>();
  const { primary, mainForeground, black } = theme.colors;

  //routes
  const TABROUTES: TabRouteTypes[] = useMemo(() => {
    return [
      {
        name: "room_screen",
        component: RoomScreen,
        tabLabel: t("tab_navigation.label.recording"),
        icon: "record-voice-over",
      },
      {
        name: "setting_screen",
        component: SettingScreen,
        tabLabel: t("tab_navigation.label.setting"),
        icon: "settings",
      },
    ];
  }, [t]);

  return (
    <Tab.Navigator
      initialRouteName="room_screen"
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
