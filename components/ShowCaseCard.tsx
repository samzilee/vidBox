import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { MediumImage } from "./ImageSize";

const ShowCaseCard = ({ item, type }: { item: media_type; type: string }) => {
  return (
    <View className="flex flex-col pb-5 w-[140px] ">
      <Link href={`/details/${item.id}_${type}`} className="min-h-full">
        {MediumImage(item.poster_path || item.backdrop_path, false)}
      </Link>
      <Text className="py-1 text-sm font-bold text-gray-500" numberOfLines={2}>
        {item.title || item.name || item.original_title}
      </Text>
    </View>
  );
};

export default ShowCaseCard;
