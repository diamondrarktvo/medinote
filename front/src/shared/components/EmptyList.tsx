import AnimatedLottieView from "lottie-react-native";
import Box from "./Box";
import { StyleSheet } from "react-native";
import Text from "./Text";
import { EmptyListImage } from "_assets";

type Props = {
  textToShow: string;
};

const EmptyList = ({ textToShow }: Props) => {
  return (
    <Box
      flexDirection={"column"}
      flex={1}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <AnimatedLottieView
        source={EmptyListImage}
        autoPlay
        loop
        style={styles.lottieImg}
      />
      <Text variant={"primary"} textAlign={"center"}>
        {textToShow}
      </Text>
    </Box>
  );
};

const styles = StyleSheet.create({
  lottieImg: {
    height: 200,
    width: 200,
  },
});

export default EmptyList;
