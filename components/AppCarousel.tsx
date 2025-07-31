import { FetchTrending } from "@/services/api";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import GenreDisplay from "./GenreDisplay";

export default function AppCarousel() {
  const [data, setData] = useState<Array<media_type>>([]);
  const [displaying, setDisplaying] = useState<media_type | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [ferror, setError] = useState<boolean>(false);

  const width = Dimensions.get("window");

  useEffect(() => {
    if (data.length === 0) {
      handleFetchTrending();
    }
  }, []);

  const handleProgress = (index: number) => {
    if (data.length !== 0) {
      setDisplaying(data[Math.round(index)]);
    }
  };

  const handleFetchTrending = async () => {
    try {
      setLoading(true);
      const result = await FetchTrending(1, "day");
      setData(result);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(true);
      setLoading(false);
    }
  };

  return (
    <View>
      {loading || data.length === 0 ? (
        <View className="w-full h-[500px] items-center justify-center ">
          {ferror ? (
            <Text className="text-lg font-bold text-red-500">
              Error Loading
            </Text>
          ) : (
            <ActivityIndicator color={"#84cc16"} size={"large"} />
          )}
        </View>
      ) : (
        <>
          <Carousel
            data={data}
            width={width.width}
            loop={true}
            height={450}
            pagingEnabled={true}
            snapEnabled={true}
            autoPlayInterval={5000}
            autoPlay={true}
            defaultIndex={0}
            onProgressChange={(offsetProgress, absoluteProgress) =>
              handleProgress(absoluteProgress)
            }
            mode={"parallax"}
            renderItem={({ item }) => (
              <Link
                href={`/details/${item.id}_${item.media_type}`}
                className="w-full h-full"
              >
                <Image
                  className="object-cover rounded-xl size-full"
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                  }}
                />
              </Link>
            )}
          />

          <View className="flex flex-col items-center justify-between w-full px-5 h-[130px] ">
            {/* Movie || Tv series title */}
            <Text
              className="text-center text-white text-[1.5rem]"
              numberOfLines={1}
            >
              {displaying?.title ||
                displaying?.name ||
                displaying?.original_title}
            </Text>

            {/* Media type and Genres */}
            <View className="flex flex-row items-center justify-center w-full gap-3 px-12">
              <Text numberOfLines={1} className="text-sm text-gray-500">
                {displaying?.media_type === "movie" ? "Movie" : "Tv Series"}
              </Text>
              <Text className="font-bold text-gray-500 text-[20px]">·</Text>
              {/* Genres */}
              {displaying !== null && (
                <GenreDisplay
                  media_type={displaying?.media_type}
                  genre_ids={displaying?.genre_ids}
                />
              )}
            </View>

            {/* footer */}
            <View className="flex flex-row items-center justify-between w-full gap-5 px-2 mt-5">
              {/* Detail */}
              <Link href={`/details/${displaying?.id}`}>
                <View className="flex flex-col items-center">
                  <Ionicons
                    name="alert-circle-outline"
                    size={24}
                    color={"gray"}
                  />
                  <Text className="text-sm text-gray-500">Detail</Text>
                </View>
              </Link>

              {/* Watch now */}
              <TouchableOpacity
                className="flex-1 py-4 rounded-lg bg-secondary"
                onPress={() => {}}
              >
                <Text className="font-bold text-center text-white">
                  WATCH NOW
                </Text>
              </TouchableOpacity>

              {/* Add list */}
              <TouchableOpacity className="flex flex-col items-center">
                <Ionicons name="bookmark-outline" size={24} color={"gray"} />
                <Text className="text-sm text-gray-500">Add List</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </View>
  );
}
