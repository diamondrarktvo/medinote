import { createBox, BoxProps as RestyleBoxProps } from "@shopify/restyle";
import React from "react";
import { ThemeT } from "_theme";
import { StyleProp, ViewStyle } from "react-native";

const Box = createBox<ThemeT>();

export type BoxProps = RestyleBoxProps<ThemeT> & {
  style?: StyleProp<ViewStyle>;
};

export default Box;
