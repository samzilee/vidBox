import { movieGenresMap, tvGenresMap } from "@/constants/genres";
import React from "react";
import { Text } from "react-native";

const GenreDisplay = ({
  media_type,
  genre_ids,
}: {
  media_type: string;
  genre_ids: Array<number>;
}) => {
  if (!genre_ids || !media_type) return;
  return (
    <Text className="text-gray-500 " numberOfLines={1}>
      {genre_ids &&
        genre_ids.map((id, index) => {
          //@ts-ignore
          return `${media_type === "movie" ? movieGenresMap[id] : tvGenresMap[id]}${index === genre_ids.length - 1 ? " " : ", "}`;
        })}
    </Text>
  );
};

export default GenreDisplay;
