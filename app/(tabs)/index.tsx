import AppCarousel from "@/components/AppCarousel";
import ShowCase from "@/components/ShowCase";
import { logos } from "@/constants/logos";
import {
  FetchLatestMovie,
  FetchLatestTV,
  FetchPopular,
  FetchTrending,
} from "@/services/api";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function index() {
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const handleRefresh = () => {
    setRefreshing(true);
    const timeOutId = setTimeout(() => {
      setRefreshing(false);
    }, 2000);

    return () => clearTimeout(timeOutId);
  };

  return (
    <View className="flex-1 bg-primary">
      <View>
        <View className="flex flex-row items-center justify-between">
          <Image
            source={logos.defaultImg}
            className="max-w-[150px] max-h-[50px] my-2 rounded-lg ml-5"
          />
          <View className="flex flex-row items-center gap-4 pr-7">
            <Link href={"/search/Search"}>
              <Ionicons name="search-outline" size={26} color={"white"} />
            </Link>

            <TouchableOpacity onPress={() => {}}>
              <Ionicons name="person-circle" size={40} color={"white"} />
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex flex-row w-full gap-8 p-5">
          <Link href={`/viewAll/Trending`}>
            <Text className="text-lg font-bold text-white">Trending</Text>
          </Link>
          <Link href={`/viewAll/Popular`}>
            <Text className="text-lg font-bold text-white">Popular</Text>
          </Link>
        </View>
      </View>

      <ScrollView
        className="pb-5"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        {!refreshing && (
          <>
            <AppCarousel />

            <View className="flex flex-col flex-1 gap-5 mt-3">
              {/* Trending */}
              <ShowCase
                title="Trending"
                viewAll={true}
                fetchData={() => FetchTrending(1, "day")}
                type=""
              />

              {/* Popular */}
              <ShowCase
                title="Popular"
                viewAll={false}
                fetchData={() => FetchPopular("movie", 1)}
                type="both"
              />

              {/* Laest Movies */}
              <ShowCase
                title="Latest Movies"
                viewAll={true}
                fetchData={() => FetchLatestMovie(1)}
                type="movie"
              />

              {/* Latest Tv Series */}
              <ShowCase
                title="Latest TV Series"
                viewAll={true}
                fetchData={() => FetchLatestTV(1)}
                type="tv"
              />
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}
