import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { MediumImage } from "./ImageSize";

const ShowCaseCard = ({ item, type }: { item: media_type; type: string }) => {
  return (
    <TouchableOpacity
      onPress={() => router.push(`/details/${item.id}_${type}`)}
      className="flex flex-col pb-5 w-[120px]"
    >
      {MediumImage(item.poster_path, false)}

      <Text className="py-1 text-sm font-bold text-gray-500 " numberOfLines={1}>
        {item.title || item.name || item.original_title}
      </Text>
    </TouchableOpacity>
  );
};

export default ShowCaseCard;
