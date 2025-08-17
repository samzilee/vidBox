import { FetchSimilar } from "@/services/api";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Platform, Text, ToastAndroid, View } from "react-native";
import { Tabs } from "react-native-collapsible-tab-view";
import GenreDisplay from "./GenreDisplay";
import { SmallImage } from "./ImageSize";
import LoadMoreIndicator from "./LoadMoreIndicator";
import { LinearCardListSkeleton } from "./Skeleton";

export const Related = ({
  data,
  media_type,
}: {
  data: Moviedetails | TvShowDetails;
  media_type: string;
}) => {
  const [page, setPage] = useState<number>(1);
  const [similar, setSimilar] = useState<Array<Similar>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [paginationEnd, setPaginationEnd] = useState<boolean>(false);
  const [ferror, setError] = useState<boolean>(false);

  useEffect(() => {
    handleFetchRelated();
  }, []);

  useEffect(() => {
    handleLoadMore();
  }, [page]);

  const handleFetchRelated = async () => {
    if (!data || similar.length > 0) return;
    try {
      setLoading(true);
      const result = await FetchSimilar(data.id, media_type, page);
      setSimilar(result);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
    }
  };

  const handleLoadMore = async () => {
    if (!data || loading || loadingMore) return;

    try {
      setLoadingMore(true);
      const moreData = await FetchSimilar(data.id, media_type, page);
      setSimilar((prev) => [...prev, ...moreData]);
      setLoadingMore(false);
      if (moreData.length === 0) {
        setLoadingMore(false);
        setPaginationEnd(true);
        if (Platform.OS !== "android") return;
        return ToastAndroid.show(
          "No more media found. Try a different search?",
          5
        );
      }
    } catch (error) {
      console.log(error);
      setLoadingMore(false);
      if (Platform.OS === "android") {
        ToastAndroid.show("Error", 5);
      }
    }
  };

  return loading ? (
    <Tabs.ScrollView
      showsVerticalScrollIndicator={false}
      className="p-5 animate-pulse"
    >
      <LinearCardListSkeleton />
    </Tabs.ScrollView>
  ) : (
    <Tabs.FlatList
      data={similar}
      showsVerticalScrollIndicator={false}
      //   ItemSeparatorComponent={() => <View className="h-5" />}
      renderItem={({ item }) => (
        <Link href={`/details/${item.id}_movie`}>
          <View className="flex flex-row gap-5 px-5 pt-5">
            {SmallImage(item.poster_path, false)}
            <View className="flex-1">
              <Text
                className="text-[1.2rem] text-white text-lg"
                numberOfLines={1}
              >
                {item.title}
              </Text>
              <Text className="text-sm text-gray-500">
                {`Movie - ${item.release_date?.split("-")[0] || "N/A"}`}
              </Text>
              <GenreDisplay
                media_type={media_type}
                genre_ids={item.genre_ids}
              />
            </View>
          </View>
        </Link>
      )}
      keyExtractor={(item, index) => index.toString()}
      ListFooterComponent={
        <LoadMoreIndicator
          loadingMore={loadingMore}
          paginationEnd={paginationEnd}
          errorMessage="No more media found."
        />
      }
      onEndReached={() => setPage((prev) => prev + 1)}
      onEndReachedThreshold={0.5}
    />
  );
};
