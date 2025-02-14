import React from "react";
import {
  TouchableOpacity as RNTouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

type Props = {
  children: React.ReactNode;
  onPress?: () => void;
  backgroundColor?: string;
} & TouchableOpacityProps;

const TouchableOpacity = ({
  children,
  onPress,
  backgroundColor,
  ...props
}: Props) => {
  return (
    <RNTouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      style={{ backgroundColor: backgroundColor, ...props }}
    >
      {children}
    </RNTouchableOpacity>
  );
};

export default TouchableOpacity;
