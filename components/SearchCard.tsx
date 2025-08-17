import { Link, router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import GenreDisplay from "./GenreDisplay";
import { SmallImage } from "./ImageSize";

export const SearchCard = ({
  item,
  countries,
}: {
  item: media_type;
  countries: Array<Countries_type>;
}) => {
  const [country, setCountry] = useState<string>("");

  useEffect(() => {
    if (countries.length > 0 && item) {
      setCountry(() => {
        if (!item.origin_country) {
          return "N/A";
        } else {
          const filter = countries.filter(
            //@ts-ignore
            (value) => value.iso_3166_1 === item?.origin_country[0]
          );
          return filter[0]?.english_name;
        }
      });
    }
  }, [countries]);

  return (
    <Link href={`/details/${item.id}_${item.media_type}`}>
      <View className="flex flex-row gap-5 h-fit">
        {SmallImage(item.poster_path || item.backdrop_path, false)}

        <View className="flex-1 ">
          {/* Title */}
          <Text className="text-lg font-semibold text-white" numberOfLines={1}>
            {item.title || item.name || item.original_title}
          </Text>

          <View className="flex flex-row items-center w-full gap-2">
            {/* Media Type */}
            <Text className="text-sm text-gray-400">
              {item.media_type === "movie" ? "Movie" : "Tv Series"}
            </Text>

            <Text className="font-bold text-gray-500 text-[20px]">·</Text>

            {/* Release Date */}
            <Text className="text-sm text-gray-400">
              {item.first_air_date?.split("-")[0] ||
                item.release_date?.split("-")[0] ||
                "N/A"}
            </Text>

            <Text className="font-bold text-gray-500 text-[20px]">·</Text>

            {/* Country */}
            <Text className="text-sm text-gray-400 uppercase" numberOfLines={1}>
              {country || "N/A"}
            </Text>
          </View>

          {/* Genre */}
          <GenreDisplay
            media_type={item.media_type}
            genre_ids={item.genre_ids}
          />
        </View>
      </View>
    </Link>
  );
};

export const TopSearchCard = ({
  topSearch,
  countries,
}: {
  topSearch: TopSearch;
  countries: Array<Countries_type>;
}) => {
  const [country, setCountry] = useState<string>("");

  useEffect(() => {
    if (countries.length > 0 && topSearch) {
      setCountry(() => {
        if (!topSearch.origin_country) {
          return "N/A";
        } else {
          const filter = countries.filter(
            (value) => value.iso_3166_1 === topSearch.origin_country[0]
          );
          return filter[0]?.english_name;
        }
      });
    }
  }, [countries]);

  return (
    <TouchableOpacity
      onPress={() =>
        router.push(`/details/${topSearch.movie_id}_${topSearch.media_type}`)
      }
    >
      <View className="flex flex-row gap-5 h-fit">
        {SmallImage(topSearch.poster_url, true)}

        <View className="flex-1 ">
          {/* Title */}
          <Text className="text-lg font-semibold text-white" numberOfLines={1}>
            {topSearch.title}
          </Text>

          <View className="flex flex-row items-center w-full gap-2">
            {/* Media Type */}
            <Text className="text-sm text-gray-400">
              {topSearch.media_type === "movie" ? "Movie" : "Tv Series"}
            </Text>

            <Text className="font-bold text-gray-500 text-[20px]">·</Text>

            {/* Release Date */}
            <Text className="text-sm text-gray-400">
              {topSearch.release_date?.split("-")[0] || "N/A"}
            </Text>

            <Text className="font-bold text-gray-500 text-[20px]">·</Text>

            {/* Country */}
            <Text className="text-sm text-gray-400 uppercase" numberOfLines={1}>
              {country || "N/A"}
            </Text>
          </View>

          {/* Genre */}
          <GenreDisplay
            media_type={topSearch.media_type}
            genre_ids={topSearch.genre_ids}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};
