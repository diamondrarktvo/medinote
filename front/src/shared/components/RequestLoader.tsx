import { ActivityIndicator } from "react-native-paper";
import Box, { BoxProps } from "./Box";
import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import { Overlay } from "@rneui/themed";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { useTranslation } from "react-i18next";
import Text from "./Text";
import { useGetTheme } from "_hooks";
import { Layouts } from "_utils";

type Props = {
  isOverlay?: boolean;
  error?: FetchBaseQueryError | SerializedError;
  children: React.ReactNode;
  isLoading: boolean;
} & Partial<BoxProps>;

const RequestLoader: React.FC<Props> = ({
  isOverlay,
  error,
  children,
  isLoading,
  ...props
}) => {
  const { t } = useTranslation();
  const { colors } = useGetTheme();

  if (isLoading && isOverlay) {
    return (
      <Overlay
        isVisible
        overlayStyle={styles.overlayContainer}
        animationType="fade"
      >
        <Box
          backgroundColor={"overlayBackground"}
          paddingVertical={"m"}
          flexDirection={"column"}
          justifyContent={"space-evenly"}
          alignItems={"center"}
          height={Layouts.RFValue(50)}
          width={Layouts.RFValue(60)}
          borderRadius={"lg"}
        >
          <ActivityIndicator size="large" color={colors.primary} />
          <Text color={"offWhite"}>Veuillez patienter un instant ...</Text>
        </Box>
      </Overlay>
    );
  }

  if (isLoading && !isOverlay) {
    return (
      <>
        <Box
          flex={1}
          alignItems={"center"}
          justifyContent={"center"}
          position={"absolute"}
          top={0}
          bottom={0}
          right={0}
          left={0}
          zIndex={1}
        >
          <Box
            backgroundColor={"overlayBackground"}
            paddingVertical={"m"}
            flexDirection={"column"}
            justifyContent={"space-evenly"}
            alignItems={"center"}
            height={Layouts.RFValue(50)}
            width={Layouts.RFValue(60)}
            borderRadius={"lg"}
          >
            <ActivityIndicator size="large" color={colors.primary} />
            <Text color={"offWhite"}>Veuillez patienter un instant ...</Text>
          </Box>
        </Box>
        {children}
      </>
    );
  }

  return <>{children}</>;
};

export default RequestLoader;

const styles = StyleSheet.create({
  overlayContainer: {
    backgroundColor: "transparent",
    elevation: 0,
  },
});
