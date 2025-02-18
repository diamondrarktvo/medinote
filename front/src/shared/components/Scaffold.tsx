import Box, { BoxProps } from "./Box";
import React from "react";
import Text from "./Text";

type Props = {
  children: React.ReactNode;
  typeOfScreen: "tab" | "stack" | "component" | "top";
  titleTabScreen?: string;
} & Partial<BoxProps>;

type HeaderProps = {
  title?: string | undefined;
};

const HeaderTabTitle = ({ title }: HeaderProps) => {
  return title ? (
    <Box paddingVertical="m" backgroundColor="mainBackground">
      <Text variant="headerNavigation" color={"primary"}>
        {title}
      </Text>
    </Box>
  ) : null;
};

const Scaffold: React.FC<Props> = ({
  children,
  typeOfScreen,
  titleTabScreen,
  ...props
}) => {
  return (
    <Box
      flex={1}
      paddingHorizontal="s"
      paddingVertical="s"
      backgroundColor="mainBackground"
      {...props}
    >
      {typeOfScreen === "tab" && <HeaderTabTitle title={titleTabScreen} />}
      {children}
    </Box>
  );
};

export default Scaffold;
