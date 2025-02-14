import { ActivityIndicator } from "react-native-paper";
import Box, { BoxProps } from "./Box";
import React, { useState, useEffect } from "react";
import { Dimensions } from "react-native";
import Text from "./Text";
import Button from "./Button";
import { useNavigation } from "@react-navigation/native";
import NetInfo from "@react-native-community/netinfo";

type Props = {
  children: React.ReactNode;
  isError?: boolean;
  errorStatus: number;
  onRefresh: () => void;
  isSearchScreen?: boolean;
} & Partial<BoxProps>;

const RequestError: React.FC<Props> = ({
  children,
  isError,
  errorStatus,
  onRefresh,
  isSearchScreen = false,
  ...props
}) => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigation = useNavigation();
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isUserHasAccessToInternet, setIsUserHasAccessToInternet] =
    useState<boolean>(false);

  useEffect(() => {
    switch (errorStatus) {
      case 500:
        setErrorMessage(
          "Une erreur est survenue sur le serveur, veuillez réessayer plus tard",
        );
        break;
      case 404:
        setErrorMessage("La ressource demandée n'existe pas");
        break;
      default:
        setErrorMessage("Une erreur est survenue, veuillez réessayer");
        break;
    }
  }, [errorStatus]);

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
      {isError ? (
        <Box
          flex={1}
          justifyContent={"center"}
          alignItems={"center"}
          height={Dimensions.get("window").height - 300}
        >
          <Text variant={"title"} fontWeight={"500"} color={"error"}>
            Ooops, une erreur est survenue !!!
          </Text>
          <Text variant={"primary"} color={"text"} paddingVertical={"s"}>
            {errorMessage}
          </Text>
          <Button
            variant={"primary"}
            label="Réessayer"
            onPress={onRefresh}
            mt={"xs"}
          />
          {!isSearchScreen && (
            <Button
              variant={"tertiary"}
              label="Retour"
              onPress={() => navigation.goBack()}
              mt={"xs"}
            />
          )}
        </Box>
      ) : (
        children
      )}
    </>
  );
};

export default RequestError;
