import { FetchPopular } from "@/services/api";
import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import ShowCaseCard from "./ShowCaseCard";
import { ShowCaseSkeleton } from "./Skeleton";

interface props {
  title: string;
  viewAll: boolean;
  type: string;
  fetchData: () => Promise<any>;
}

const ShowCase = ({ title, viewAll, type, fetchData }: props) => {
  const [data, setData] = useState<Array<media_type>>([]);
  const [ferror, setError] = useState<boolean>(false);
  const [option, setOption] = useState<string>("movie");

  useEffect(() => {
    if (data.length === 0) {
      handleFetch();
    }
  }, []);

  // switch between Movies ans Tv Series
  const handleReFetch = async () => {
    try {
      const result = await FetchPopular(option, 1);
      setData(result);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  useEffect(() => {
    if (!viewAll) {
      setData([]);
      handleReFetch();
    }
  }, [option]);

  const handleFetch = async () => {
    try {
      const result = await fetchData();

      setData(result);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  return (
    <View className="h-[250px] px-5">
      <View className="flex flex-row items-center justify-between mb-3">
        <Text className="text-lg font-bold text-white">{title}</Text>
        {viewAll ? (
          <Link href={`/viewAll/${title}`}>
            <Text className="text-sm font-bold text-secondary">View all</Text>
          </Link>
        ) : (
          <View className="flex flex-row gap-5">
            <TouchableOpacity onPress={() => setOption("movie")}>
              <Text
                className={`text-sm font-bold ${option === "movie" ? "text-secondary" : "text-gray-500"}`}
              >
                Movie
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setOption("tv")}>
              <Text
                className={`text-sm font-bold ${option === "tv" ? "text-secondary" : "text-gray-500"}`}
              >
                Tv Series
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      {data.length > 0 ? (
        <FlatList
          data={data}
          horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View className="w-4" />}
          renderItem={({ item }) => (
            <ShowCaseCard
              item={item}
              type={item.media_type || (type == "both" && option) || type}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <ShowCaseSkeleton />
      )}
    </View>
  );
};

export default ShowCase;
