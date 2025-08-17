import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, ImageBackground, Text, View } from "react-native";

const DetailPoster = ({
  media_data,
}: {
  media_data: Moviedetails | TvShowDetails | null;
}) => {
  return (
    <View className="h-[400px]">
      <ImageBackground
        source={{
          uri: `https://image.tmdb.org/t/p/w780${media_data?.backdrop_path}`,
        }}
        resizeMode="cover"
        imageClassName="opacity-[0.5]"
        className="flex-1"
      >
        <View className="relative w-full h-full opacity-1">
          <View className="absolute bottom-0 flex-row items-center w-full gap-3 px-5 pb-3">
            {/* Poster Image */}
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w300${media_data?.poster_path}`,
              }}
              resizeMode="cover"
              className="w-[120px] h-[140px] rounded-lg bg-gray-500"
            />

            {/* Title, Average Vote,Vote Count, Release Data  */}
            <View className="flex-col flex-1">
              <Text
                className="max-w-full text-2xl text-white"
                numberOfLines={1}
              >
                {/* @ts-ignore */}
                {media_data?.title || media_data?.name}
              </Text>

              <View className="flex-row items-center gap-5">
                <View className="flex-row items-center gap-2">
                  <Ionicons name="star" size={10} color="#84cc16" />
                  <Text className="text-sm font-semibold text-secondary">
                    {media_data?.vote_average.toFixed(1)}
                  </Text>
                  <Text className="text-sm font-bold text-gray-400">
                    ({media_data?.vote_count} voted)
                  </Text>
                </View>

                <Text className="font-semibold text-white">
                  {/* @ts-ignore */}
                  {media_data?.release_date?.split("-")[0] ||
                    // @ts-ignore
                    media_data?.first_air_date?.split("-")[0]}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default DetailPoster;
