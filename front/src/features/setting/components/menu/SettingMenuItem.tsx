import React from "react";
import { MenuAndItemsT } from "../../SettingTypes";
import { Box, Text, TouchableOpacity } from "_shared";
import { ListRenderItem } from "@shopify/flash-list";

const SettingMenuItem: ListRenderItem<MenuAndItemsT> = ({ item }) => {
  return (
    <Box key={item.id} flex={1}>
      <Text variant={"bigTitle"} fontWeight={"800"}>
        {item.title}
      </Text>
      <Box marginHorizontal={"s"} marginTop={"s"}>
        {item.items?.map((item) => (
          <TouchableOpacity key={item.id} onPress={item.action}>
            <Box
              flex={1}
              flexDirection={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              marginBottom={"l"}
            >
              <Text variant={"primary"} fontWeight={"600"}>
                {item.label}
              </Text>
              <Text variant={"secondary"}>{item.defaultValue}</Text>
            </Box>
          </TouchableOpacity>
        ))}
      </Box>
    </Box>
  );
};

export default SettingMenuItem;
