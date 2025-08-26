import { FetchVideo } from "@/services/api";
import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Tabs } from "react-native-collapsible-tab-view";
import WebView from "react-native-webview";

const Video = ({ id, media_type }: { id: number; media_type: string }) => {
  const width = Dimensions.get("screen").width;
  const focused = useIsFocused();
  const [media, setMedia] = useState<Array<video>>([]);
  const [categories, setCategories] = useState<Array<string>>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    if (id && media_type) {
      HandleFetchVideo();
    }
  }, []);

  useEffect(() => {
    // passing the first value as the default type
    if (categories.length > 0) {
      setSelectedCategory(categories[0]);
    }
  }, [categories, media]);

  const HandleFetchVideo = async () => {
    try {
      const results: Array<video> = await FetchVideo(id, media_type);
      setMedia(
        results.filter(
          (result) => result.site.toLocaleLowerCase() === "youtube"
        )
      );

      // removing redundant types from the array

      for (let i = 0; i <= results.length - 1; i++) {
        setCategories((prev) => {
          if (prev.includes(results[i].type)) return [...prev];
          return [...prev, results[i].type];
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!focused) return null;

  return (
    <Tabs.FlatList
      data={media}
      keyExtractor={(item) => item.id.toString()}
      ListHeaderComponent={() => {
        return (
          <View className="flex-col gap-3 py-2">
            <Text className="px-5 text-lg font-semibold text-white ">
              Total videos: {media.length}
            </Text>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={categories}
              ItemSeparatorComponent={() => <View className="w-2" />}
              keyExtractor={(item) => item}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedCategory(item);
                    }}
                    className={`px-2 py-1  ${item == selectedCategory ? "bg-secondary" : "bg-gray-700"} rounded-lg`}
                  >
                    <Text
                      className={`text-sm ${item == selectedCategory ? "text-black" : "text-gray-400"}`}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        );
      }}
      renderItem={({ item }) => {
        if (item.type !== selectedCategory) return null;
        return (
          <View
            className="h-[300px] rounded-lg overflow-hidden mb-5"
            style={{ width: width }}
          >
            <WebView
              source={{
                uri: `https://www.youtube-nocookie.com/embed/${item.key}`,
              }}
              allowsFullscreenVideo
              className="flex-1"
            />
            <View className="w-full p-2 ">
              <Text
                className="text-sm font-semibold text-white"
                numberOfLines={1}
              >
                {item.name}
              </Text>
              <Text className="text-sm text-gray-400">{item.type}</Text>
            </View>
          </View>
        );
      }}
    />
  );
};

export default Video;
