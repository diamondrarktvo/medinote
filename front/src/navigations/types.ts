import { StackNavigationOptions } from "@react-navigation/stack";

export interface StackNavigationConfig {
  screenOptionsForDisplayedHeader: StackNavigationOptions;
  screenOptionsForHiddenHeader: StackNavigationOptions;
}

export type StackParamList = {
  main_tabs: undefined;
};

export type TabParamList = {
  voice_analysis_screen: undefined;
  setting_screen: undefined;
};

export interface TabRouteTypes {
  name: keyof TabParamList;
  component: React.FC<unknown>;
  tabLabel: string;
  icon: string;
}
