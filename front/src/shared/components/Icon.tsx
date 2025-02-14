import { Icon as RNEIcon, IconProps as RNEIconProps } from "@rneui/themed";
import React from "react";
import { ActivityIndicator } from "react-native-paper";
import { Size } from "_theme";

type IconPropsType = RNEIconProps & {
  loading?: boolean;
};

const Icon = ({ loading, ...props }: IconPropsType) =>
  loading ? (
    <ActivityIndicator
      color="#2652AA"
      style={{
        backgroundColor: "white",
        padding: 1,
        borderRadius: 50,
        width: Size.ICON_LARGE,
        height: Size.ICON_LARGE,
      }}
    />
  ) : (
    <RNEIcon {...props} />
  );

export type IconProps = React.ComponentProps<typeof Icon>;
export default Icon;
