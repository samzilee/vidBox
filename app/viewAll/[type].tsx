import LoadMoreIndicator from "@/components/LoadMoreIndicator";
import { icons } from "@/constants/icons";
import {
  FetchLatestMovie,
  FetchLatestTV,
  FetchPopular,
  FetchTrending,
} from "@/services/api";
import { Link, router, useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Platform,
  Text,
  ToastAndroid,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatGrid } from "react-native-super-grid";

const viewAll = () => {
  const { type } = useLocalSearchParams();
  const navigation = useNavigation();
  const [data, setData] = useState<Array<media_type>>([]);
  const [trendOption, setTrendOption] = useState<string>("day");
  const [popularOption, setPopularOption] = useState<string>("movie");
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [paginationEnd, setPaginationEnd] = useState<boolean>(false);
  const [media_type, setMedia_type] = useState<string | null>(null);

  const fixedFetch = async () => {
    const newType = type.toString().toLowerCase();

    if (newType === "trending") {
      return await FetchTrending(page, trendOption);
    } else if (newType === "latest movies") {
      setMedia_type("movie");
      return await FetchLatestMovie(page);
    } else if (newType === "latest tv series") {
      setMedia_type("tv");
      return await FetchLatestTV(page);
    } else if (newType === "popular") {
      return FetchPopular(popularOption, page);
    } else {
      throw new Error("Unknown Param!!");
    }
  };

  useEffect(() => {
    handleFetchData();
  }, [trendOption, popularOption]);

  const handleFetchData = async () => {
    try {
      setLoading(true);
      const result = await fixedFetch();
      setData(result);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (data.length > 0) {
      handleLoadMore();
    }
  }, [page]);

  const handleLoadMore = async () => {
    try {
      if (paginationEnd) return;
      setLoadingMore(true);
      const moreData: Array<media_type> = await fixedFetch();

      if (moreData.length === 0) {
        setLoadingMore(false);
        setPaginationEnd(true);
        return;
      }

      setData((prev) => [...prev, ...moreData]);
      setLoadingMore(false);
    } catch (error) {
      setLoadingMore(false);
      console.log(error);

      if (Platform.OS === "android") {
        ToastAndroid.show("Error", 4);
      }
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <View className="flex flex-row items-center justify-between w-full p-5">
        <TouchableHighlight onPress={() => navigation.goBack()}>
          <View className="flex flex-row items-center gap-2">
            {icons.backIcon()}
            <Text className="text-xl font-bold text-white">{type}</Text>
          </View>
        </TouchableHighlight>

        <TouchableOpacity onPress={() => router.push("/search/Search")}>
          {icons.searchIcon()}
        </TouchableOpacity>
      </View>

      {type === "Trending" && (
        <View className="flex flex-row w-full gap-8 pb-5 pl-8 mt-3">
          <TouchableOpacity onPress={() => setTrendOption("day")}>
            <Text
              className={`${trendOption == "day" ? "text-secondary" : "text-gray-500"} text-[1.2rem] font-semibold`}
            >
              Day
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setTrendOption("week")}>
            <Text
              className={`${trendOption == "week" ? "text-secondary" : "text-gray-500"} text-[1.2rem] font-semibold`}
            >
              Week
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {type === "Popular" && (
        <View className="flex flex-row w-full gap-8 pb-5 pl-8 mt-3">
          <TouchableOpacity onPress={() => setPopularOption("movie")}>
            <Text
              className={`${popularOption == "movie" ? "text-secondary" : "text-gray-500"} text-[1.2rem] font-semibold`}
            >
              Movies
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setPopularOption("tv")}>
            <Text
              className={`${popularOption == "tv" ? "text-secondary" : "text-gray-500"} text-[1.2rem] font-semibold`}
            >
              Tv Series
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {loading ? (
        <View className="flex items-center justify-center flex-1">
          <ActivityIndicator size="large" color="#84cc16" />
        </View>
      ) : (
        <FlatGrid
          contentContainerStyle={{ padding: 5 }}
          data={data}
          spacing={10}
          itemDimension={100}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Link
              href={`/details/${item.id}_${item.media_type || media_type || popularOption}`}
              className="h-[200px]"
            >
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w185${item.poster_path || item.backdrop_path}`,
                }}
                className="bg-gray-500 rounded-lg size-full"
                resizeMode="cover"
              />
            </Link>
          )}
          ListFooterComponent={
            <LoadMoreIndicator
              loadingMore={loadingMore}
              paginationEnd={paginationEnd}
              errorMessage="No more media found."
            />
          }
          onEndReached={() => !loadingMore && setPage((prev) => prev + 1)}
        />
      )}
    </SafeAreaView>
  );
};

export default viewAll;
