import React from "react";
import { Box, Row, Text, TouchableOpacity } from "_shared";
import { ListRenderItem } from "@shopify/flash-list";
import { RoomT } from "../../RecordingTypes";
import { DateUtils, Helpers, Layouts } from "_utils";

const RoomItem: ListRenderItem<RoomT> = ({ item }) => {
  return (
    <Box key={item.id} flex={1}>
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
    </Box>
  );
};

export default RoomItem;
