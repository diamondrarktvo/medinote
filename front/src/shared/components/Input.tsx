import { TextInput, TextInputProps, StyleSheet, Keyboard } from "react-native";
import React from "react";
import Row from "./Row";
import Text from "./Text";
import Icon from "./Icon";
import TouchableOpacity from "./TouchableOpacity";
import { ThemeT } from "_theme";
import { useTheme } from "@shopify/restyle";
import Box from "./Box";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

type InputProps = TextInputProps & {
  iconRight?: {
    name: string;
    color: string;
    size: number;
    onPress?: () => void;
  };
  iconLeft?: {
    name: string;
    color: string;
    size: number;
  };
  errorMessage?: string;
  label?: string;
  boldLabel?: boolean;
  inputCustomStyle?: any;
};

/**
 *
 * @param iconRight
 * @param iconLeft
 * @param errorMessage
 * @param label
 * @param inputCustomStyle
 * @returns
 */
const Input = ({
  iconRight,
  iconLeft,
  errorMessage,
  label,
  boldLabel,
  inputCustomStyle,
  ...props
}: InputProps) => {
  const theme = useTheme<ThemeT>();
  const { spacing, colors } = theme;

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <Box mb="s">
        {label ? (
          <Text
            variant={"primary"}
            color="primaryDark"
            fontWeight={boldLabel ? "bold" : "normal"}
          >
            {label}
          </Text>
        ) : null}
        <Row
          borderRadius="md"
          backgroundColor="input"
          width="100%"
          paddingVertical="s"
          paddingHorizontal="s"
          marginVertical="xs"
          alignItems="center"
        >
          {iconLeft && (
            <Icon
              name={iconLeft.name}
              size={iconLeft.size}
              color={iconLeft.color}
            />
          )}
          <Row flex={1} justifyContent="space-between">
            <TextInput
              {...props}
              onEndEditing={props.onEndEditing || (() => {})}
              style={{
                width: iconRight ? "90%" : "100%",
                marginLeft: iconLeft ? spacing.s : 0,
                color: colors.black,
                ...inputCustomStyle,
              }}
            />
            {iconRight && (
              <TouchableOpacity onPress={iconRight.onPress}>
                <Icon
                  name={iconRight.name}
                  size={iconRight.size}
                  color={iconRight.color}
                />
              </TouchableOpacity>
            )}
          </Row>
        </Row>
        {errorMessage ? (
          <Text variant={"tertiary"} color="error">
            {errorMessage}
          </Text>
        ) : null}
      </Box>
    </TouchableWithoutFeedback>
  );
};

export type ImageProps = React.ComponentProps<typeof Input>;
export default Input;

const styles = StyleSheet.create({});
