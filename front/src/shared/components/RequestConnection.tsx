import Box, { BoxProps } from "./Box";
import React, { useState, useEffect } from "react";
import { Dimensions, StyleSheet } from "react-native";
import Text from "./Text";
import NetInfo from "@react-native-community/netinfo";
import AnimatedLottieView from "lottie-react-native";
import { ConnectionLost } from "_assets";

type Props = {
  children: React.ReactNode;
} & Partial<BoxProps>;

const RequestConnection: React.FC<Props> = ({ children, ...props }) => {
  const [isConnected, setIsConnected] = useState<boolean>(true);
  const [isUserHasAccessToInternet, setIsUserHasAccessToInternet] =
    useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected) {
        setIsConnected(state.isConnected);
      }
      if (state.isInternetReachable) {
        setIsUserHasAccessToInternet(state.isInternetReachable);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <>
      {!isConnected || !isUserHasAccessToInternet ? (
        <Box flex={1} justifyContent={"center"} alignItems={"center"}>
          <AnimatedLottieView
            source={ConnectionLost}
            autoPlay
            loop
            style={styles.lottieImg}
          />
          <Text variant={"primary"}>Vous n'êtes pas connecté à internet</Text>
        </Box>
      ) : (
        children
      )}
    </>
  );
};

const styles = StyleSheet.create({
  lottieImg: {
    height: 200,
    width: 200,
  },
});

export default RequestConnection;
