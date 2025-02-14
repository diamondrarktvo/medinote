import { useNavigation } from "@react-navigation/native";
import Row from "./Row";
import Icon from "./Icon";
import Text from "./Text";
import { useGetTheme } from "_hooks";

type Props = {
  text: string | any;
  textAlign?: "center" | "auto" | "left" | "right" | "justify" | undefined;
  iconRight?: string;
  onPressIconRight?: () => void;
  onPressIconLeft?: () => void;
};

const Header: React.FC<Props> = ({
  text,
  textAlign,
  iconRight,
  onPressIconRight,
  onPressIconLeft,
}) => {
  const navigation = useNavigation();
  const { sizes } = useGetTheme();
  return (
    <Row
      alignItems={"center"}
      justifyContent={"space-between"}
      mt={"m"}
      mb={"m"}
    >
      <Row alignItems={"center"} justifyContent={"flex-start"}>
        <Icon
          name={"arrow-back"}
          size={sizes.ICON_LARGE}
          onPress={() =>
            onPressIconLeft ? onPressIconLeft() : navigation.goBack()
          }
        />
        {typeof text === "string" ? (
          <Text
            variant={"bigTitle"}
            fontWeight={"bold"}
            fontSize={sizes.TYPO.veryBig}
            textAlign={textAlign ? textAlign : "center"}
            ml={"s"}
            style={{ width: "80%" }}
          >
            {text}
          </Text>
        ) : (
          text
        )}
      </Row>
      {iconRight && onPressIconRight && (
        <Icon
          name={iconRight}
          size={sizes.ICON_LARGE}
          onPress={() => onPressIconRight()}
        />
      )}
    </Row>
  );
};

export default Header;
