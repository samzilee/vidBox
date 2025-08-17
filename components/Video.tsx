import { FetchVideo } from "@/services/api";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, ScrollView, Text, View } from "react-native";
import { Tabs } from "react-native-collapsible-tab-view";
import WebView from "react-native-webview";

const Video = ({ id, media_type }: { id: number; media_type: string }) => {
  const width = Dimensions.get("screen").width;

  const [media, setMedia] = useState<Array<video>>([]);
  const [manualScroll, setManualScroll] = useState<number>(width);

  const videoScroll = useRef<ScrollView>(null);

  useEffect(() => {
    if (id && media_type) {
      HandleFetchVideo();
    }
  }, []);

  const HandleFetchVideo = async () => {
    try {
      const results: Array<video> = await FetchVideo(id, media_type);
      setMedia(
        results.filter(
          (result) => result.site.toLocaleLowerCase() === "youtube"
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Tabs.FlatList
      data={media_type}
      keyExtractor={(item) => item}
      stickyHeaderIndices={[0]}
      StickyHeaderComponent={() => {
        return (
          <View className="flex-row px-5 py-2">
            <Text className="text-lg font-semibold text-white ">
              Total videos: {media.length}
            </Text>
          </View>
        );
      }}
      renderItem={() => {
        return (
          <FlatList
            data={media}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
              return (
                <View
                  className="h-[300px] rounded-lg overflow-hidden mb-5"
                  style={{ width: width }}
                >
                  <WebView
                    source={{
                      uri: `https://www.youtube.com/embed/${item.key}`,
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
            initialNumToRender={3}
          />
        );
      }}
    />
  );
};

export default Video;
