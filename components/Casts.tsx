import React from "react";
import { Image, Text, View } from "react-native";
import { Tabs } from "react-native-collapsible-tab-view";

export const Casts = ({
  data,
}: {
  data: Moviedetails | TvShowDetails | null;
}) => {
  return (
    <Tabs.ScrollView>
      <View className="flex-col gap-5 p-5">
        {data?.credits.cast.map((item, index) => {
          return (
            <View className="flex-row items-center flex-1 gap-5 " key={index}>
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w185${item?.profile_path}`,
                }}
                className="bg-gray-500 size-[80px]  rounded-full"
                resizeMode="cover"
              />

              <View className="flex-1">
                <Text
                  className="text-lg font-bold text-white"
                  numberOfLines={1}
                >
                  {item?.name}
                </Text>

                <Text
                  className="max-w-full text-sm font-semibold text-gray-500 "
                  numberOfLines={2}
                >
                  {item?.character}
                  {"  ·  "}
                  {item?.known_for_department}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </Tabs.ScrollView>
  );
};
