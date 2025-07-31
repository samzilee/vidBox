import { FetchDetails } from "@/services/api";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Platform, ToastAndroid, View } from "react-native";
import Movie from "./Movie";
import Tv from "./Tv";

const MovieDetails = () => {
  const { id } = useLocalSearchParams();

  const newId = id.toString().split("_");
  const mainIdNumer = newId[0];
  const media_type = newId[1];
  const [movieData, setMovieData] = useState<Movedetails | null>(null);
  const [tvData, setTvData] = useState<TvShowDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    handleFetchDetauils();
  }, []);

  const handleFetchDetauils = async () => {
    try {
      setLoading(true);

      const result = await FetchDetails(media_type, mainIdNumer);

      if (media_type === "movie") {
        setMovieData(result);
      } else if (media_type === "tv") {
        setTvData(result);
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      if (Platform.OS == "android") {
        ToastAndroid.show("Error", 4);
      }
    }
  };

  return (
    <View className="flex flex-1 bg-primary">
      {media_type === "movie" ? (
        <Movie media_data={movieData} loading={loading} />
      ) : (
        <Tv media_data={tvData} loading={loading} />
      )}
    </View>
  );
};

export default MovieDetails;
