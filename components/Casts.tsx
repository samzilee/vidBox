import React from "react";
import { Image, ScrollView, Text, View } from "react-native";

export const Casts = ({
  data,
  scroll,
}: {
  data: Movedetails | null;
  scroll: boolean;
}) => {
  if (!data) return;
  return (
    <ScrollView className="border border-white" scrollEnabled={scroll}>
      <View className="flex-col gap-5 px-5 ">
        {data.credits.cast.map((item, index) => {
          return (
            <View className="flex-row items-center gap-5" key={index}>
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w185${item.profile_path}`,
                }}
                className="bg-gray-500 size-[80px]  rounded-full"
                resizeMode="cover"
              />

              <View>
                <Text
                  className="text-lg font-bold text-white"
                  numberOfLines={1}
                >
                  {item.name}
                </Text>

                <View className="flex-row items-center gap-3">
                  <Text
                    className="text-sm font-semibold text-gray-500"
                    numberOfLines={1}
                  >
                    {item.character}
                    {"  ·  "}
                    {item.known_for_department}
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};
