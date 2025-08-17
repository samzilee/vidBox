import Category_text from "@/components/Category_text";
import FilterModal from "@/components/FilterModal";
import LoadMoreIndicator from "@/components/LoadMoreIndicator";
import { icons } from "@/constants/icons";
import {
  FetchLatestMovie,
  FetchLatestTV,
  FetchPopular,
  FetchTrending,
} from "@/services/api";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatGrid } from "react-native-super-grid";
import { MediumImage } from "./ImageSize";

const categories = [
  {
    title: "Latest",
  },
  {
    title: "Trending",
  },
  {
    title: "Popular",
  },
];

const Tabs_MovieTv_page = ({
  title,
  media_type,
}: {
  title: string;
  media_type: string;
}) => {
  const [media, setMedia] = useState<Array<media_type>>([]);
  const [category, setCategory] = useState<string>("latest");
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [paginationEnd, setPaginationEnd] = useState<boolean>(false);
  const [ferror, setError] = useState<boolean>(false);
  const [showFilterModa, setShowFilterModal] = useState<boolean>(false);

  const Reset = () => {
    setMedia([]);
    setPage(1);
    setLoading(false);
    setLoadingMore(false);
    setPaginationEnd(false);
    setError(false);
  };

  const FixedFetch = async () => {
    if (category === "latest") {
      if (media_type == "movie") {
        return await FetchLatestMovie(page);
      } else {
        return await FetchLatestTV(page);
      }
    } else if (category === "trending") {
      return await FetchTrending(page, "day", media_type);
    } else if (category === "popular") {
      return await FetchPopular(media_type, page);
    } else {
      throw new Error("Unknown Category!!");
    }
  };

  useEffect(() => {
    if (page && category) {
      handleFetch(false);
    }
  }, [page, category]);

  const handleFetch = async (refreshingPage: boolean) => {
    try {
      if (refreshingPage) {
        setRefreshing(true);
      }
      if (page > 1) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }
      const result = await FixedFetch();
      if (page > 1) {
        if (result.length === 0) {
          setPaginationEnd(true);
        } else {
          setMedia((prev) => {
            return [...prev, ...result];
          });
        }
      } else {
        setMedia(result);
      }

      setLoading(false);
      setLoadingMore(false);
      setRefreshing(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setLoadingMore(false);
      setError(true);
      setRefreshing(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-primary">
      {/* Movie Header */}
      <View className="flex-col gap-5 px-6 py-5">
        {/* header Layout 1 */}
        <View className="flex-row items-center justify-between w-full ">
          <Text className="text-[1.7rem] font-bold text-white">{title}</Text>
          <TouchableOpacity
            onPress={() => {
              router.push("/search/Search");
            }}
            className="items-center w-20"
          >
            {icons.searchIcon()}
          </TouchableOpacity>
        </View>

        {/* Header Layout 2 */}
        <View className="flex-row justify-between">
          <View className="flex-row gap-10">
            {categories.map((cate, index) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    Reset();
                    setCategory(cate.title.toLowerCase());
                  }}
                  key={index}
                >
                  <Category_text
                    title={cate.title}
                    active={category === cate.title.toLowerCase()}
                  />
                </TouchableOpacity>
              );
            })}
          </View>

          <TouchableOpacity
            onPress={() => setShowFilterModal(true)}
            className="flex-row items-center"
          >
            <Text className="text-lg font-semibold text-white">Filter</Text>
            <Ionicons name="filter" size={24} color={"white"} />
          </TouchableOpacity>
        </View>
      </View>

      {loading ? (
        <View className="flex items-center justify-center flex-1">
          <ActivityIndicator size="large" color="#84cc16" />
        </View>
      ) : ferror ? (
        <Text className="pt-5 text-sm font-semibold text-center text-red-700">
          ❌ Failed to load data. Check your connection and try again.
        </Text>
      ) : (
        <FlatGrid
          data={media}
          spacing={10}
          itemDimension={100}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                Reset();
                handleFetch(true);
              }}
            />
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => router.push(`/details/${item.id}_${media_type}`)}
            >
              {MediumImage(item.poster_path, false)}
            </TouchableOpacity>
          )}
          ListFooterComponent={
            <LoadMoreIndicator
              loadingMore={loadingMore}
              paginationEnd={paginationEnd}
              errorMessage="No more media found"
            />
          }
          onEndReached={() => !loadingMore && setPage((prev) => prev + 1)}
        />
      )}

      {/* Modal */}
      <FilterModal
        showModal={showFilterModa}
        setShowModal={setShowFilterModal}
        media_type={media_type}
      />
    </SafeAreaView>
  );
};

export default Tabs_MovieTv_page;
