import React from "react";
import { Box, Row, Text, TouchableOpacity } from "_shared";
import { RoomT } from "../../RecordingTypes";
import { DateUtils, Helpers, Layouts } from "_utils";
import { useNavigation } from "@react-navigation/native";

const RoomItem: React.FC<{ item: RoomT }> = ({ item }) => {
  const navigation = useNavigation();
  return (
    <Box key={item.id} flex={1} marginBottom={"m"}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("voice_screen", {
            room_id: item.id,
          })
        }
      >
        <Row>
          <Box
            borderRadius={"xl"}
            paddingVertical={"m"}
            paddingHorizontal={"l"}
            backgroundColor={"primary"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Text variant={"bigTitle"} fontSize={Layouts.RFValue(25)}>
              {Helpers.getFirstLetter(item.title)}
            </Text>
          </Box>
          <Box marginLeft={"s"} justifyContent={"space-between"}>
            <Text variant={"primaryBold"} fontSize={Layouts.RFValue(18)}>
              {item.title}
            </Text>
            <Text variant={"tertiary"}>
              {DateUtils.formatDate(item.created_at)}
            </Text>
          </Box>
        </Row>
      </TouchableOpacity>
    </Box>
  );
};

export default RoomItem;
