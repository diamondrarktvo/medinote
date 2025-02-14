import { TouchableHighlight, ActivityIndicator } from "react-native";
import Text from "./Text";
import Box from "./Box";
import { Size, ThemeT } from "_theme";
import React from "react";
import {
  border,
  BorderProps,
  BoxProps,
  createRestyleComponent,
  createVariant,
  spacing,
  SpacingProps,
  VariantProps,
} from "@shopify/restyle";
import Icon from "./Icon";
import Row from "./Row";
import { useGetTheme } from "_hooks";

type ButtonProps = {
  onPress?: () => void;
  variant: "primary" | "secondary" | "tertiary";
  loading?: boolean;
  label: React.ReactNode;
  iconRight?: string;
  iconLeft?: string;
  bold?:
    | "black"
    | "bold"
    | "600"
    | "normal"
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "700"
    | "800"
    | "900"
    | 100
    | 200
    | 300
    | 400
    | 500
    | 600
    | 700
    | 800
    | 900
    | "ultralight"
    | "thin"
    | "light"
    | undefined;
  disabled?: boolean;
  color?: keyof ThemeT["colors"];
  borderRadius?: keyof ThemeT["borderRadii"];
} & Partial<BoxProps<ThemeT>>;

type BoxButtonProps = SpacingProps<ThemeT> &
  BorderProps<ThemeT> &
  VariantProps<ThemeT, "buttonVariants"> &
  React.ComponentProps<typeof Box>;

const BoxButton = createRestyleComponent<BoxButtonProps, ThemeT>(
  [spacing, border, createVariant({ themeKey: "buttonVariants" })],
  Box,
);

/**
 *
 * @param onPress
 * @param variant
 * @param loading
 * @param label
 * @param iconRight
 * @param bold
 * @param borderColor
 * @param iconLeft
 * @param disabled
 * @param color
 * @param borderRadius
 * @param rest
 * @returns
 */
const Button: React.FC<ButtonProps> = ({
  onPress,
  variant,
  loading,
  label,
  iconRight,
  bold,
  borderColor,
  iconLeft,
  disabled,
  color = "white",
  borderRadius,
  ...rest
}) => {
  const { sizes, colors } = useGetTheme();
  return (
    <TouchableHighlight
      onPress={onPress}
      underlayColor="transparent"
      disabled={disabled}
    >
      <BoxButton
        variant={disabled ? "tertiary" : variant}
        borderColor={borderColor ? borderColor : "primary"}
        paddingVertical="s"
        paddingHorizontal="s"
        borderRadius={borderRadius ? borderRadius : "sm"}
        {...rest}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Row alignItems="center" justifyContent="center">
            {iconLeft && (
              <Icon
                name={iconLeft}
                size={Size.ICON_MEDIUM}
                color={colors.white}
              />
            )}
            <Text
              variant={"secondary"}
              color={color}
              fontWeight={bold}
              ml={iconLeft || iconRight ? "xs" : "none"}
            >
              {label}
            </Text>
            {iconRight && (
              <Icon
                name={iconRight}
                size={Size.ICON_MEDIUM}
                color={colors.white}
              />
            )}
          </Row>
        )}
      </BoxButton>
    </TouchableHighlight>
  );
};

export default Button;
