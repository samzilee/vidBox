import { Casts } from "@/components/Casts";
import DetailHeader from "@/components/DetailHeader";
import { Overview } from "@/components/Overview";
import { Related } from "@/components/Related";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TabBar, TabView } from "react-native-tab-view";

interface prop {
  media_data: Movedetails | null;
  loading: boolean;
}

const routes = [
  { key: "overview", title: "Overview" },
  { key: "casts", title: "Casts" },
  { key: "related", title: "Realated" },
];

const Movie = ({ media_data, loading }: prop) => {
  const navigate = useNavigation();
  const hieght = Dimensions.get("screen").height;
  const [routesIndex, setRoutesIndex] = useState<number>(0);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [scrollTabView, setScrollTabView] = useState<boolean>(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    const timeOutId = setTimeout(() => {
      setRefreshing(false);
    }, 2000);

    return () => clearTimeout(timeOutId);
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
      showsVerticalScrollIndicator={false}
      onScrollEndDrag={() => setScrollTabView(true)}
      scrollEnabled={!scrollTabView}
    >
      {/* {scrollTabView && (
        <TouchableOpacity
          onPress={() => setScrollTabView(false)}
          className="absolute bottom-[20px] size-[50px] rounded-full bg-white items-center justify-center z-50 right-[20px]"
        >
          <Ionicons name="arrow-up" size={30} color={"#84cc16"} />
        </TouchableOpacity>
      )} */}

      <View className="absolute top-0 z-50 w-full p-5 shadow-inner">
        {/* Header */}
        <TouchableOpacity onPress={() => navigate.goBack()} className="w-fit">
          <Ionicons name="arrow-back-outline" size={29} color="white" />
        </TouchableOpacity>
      </View>

      {/* Deatil Header */}
      <DetailHeader media_data={media_data} />

      <View className="flex-row items-center w-full gap-5 px-5 py-5 ">
        {/* Add List */}
        <TouchableOpacity
          onPress={() => {}}
          className="flex-col items-center gap-1"
        >
          <Ionicons name="bookmark-outline" size={24} color="#9ca3af" />
          <Text className="text-sm font-semibold text-gray-400">Add List</Text>
        </TouchableOpacity>

        {/* Watch Button */}
        <TouchableOpacity
          className="flex-row items-center justify-center flex-1 py-3 rounded-lg bg-secondary"
          onPress={() => {}}
        >
          <Text className="text-lg font-bold">Watch</Text>
          <Ionicons name="play" size={24} color="black" />
        </TouchableOpacity>

        {/* Watch Trailer */}
        <TouchableOpacity
          onPress={() => {}}
          className="flex-col items-center gap-1"
        >
          <Ionicons
            name="play"
            size={10}
            color="#9ca3af"
            className="py-[3px] px-[6px]  border-gray-400 w-fit border-[2px] rounded-md"
          />
          <Text className="text-sm font-semibold text-gray-400">Trailer</Text>
        </TouchableOpacity>
      </View>

      <View className={`h-screen`}>
        <TabView
          renderTabBar={(props) => (
            <TabBar
              {...props}
              indicatorStyle={{ backgroundColor: "#84cc16" }}
              style={{ backgroundColor: "#111827" }}
            />
          )}
          navigationState={{ index: routesIndex, routes: routes }}
          onIndexChange={setRoutesIndex}
          lazy={({ route }) => route.key === "related"}
          renderScene={({ route }) => {
            switch (route.key) {
              case "overview":
                return <Overview data={media_data} />;
              case "casts":
                return <Casts data={media_data} scroll={scrollTabView} />;
              case "related":
                return <Related data={media_data} />;
            }
          }}
        />
      </View>
    </ScrollView>
  );
};

export default Movie;
