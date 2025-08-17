import { FetchDetails } from "@/services/api";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Platform, ToastAndroid } from "react-native";
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import MainContent from "./MainContent";

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  const newId = id.toString().split("_");
  const mainIdNumer = newId[0];
  const media_type = newId[1];
  const from = newId[2];
  const [movieData, setMovieData] = useState<Moviedetails | null>(null);
  const [tvData, setTvData] = useState<TvShowDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [ferror, setError] = useState<boolean>(false);
  const [reFetch, setRefetch] = useState<boolean>(false);
  const [showModalFromHome, setShowmodalFromHome] = useState<boolean>(false);

  useEffect(() => {
    handleFetchDetails();
  }, []);

  useEffect(() => {
    if (!reFetch) return;
    handleFetchDetails();
  }, [reFetch]);

  useEffect(() => {
    if (from === "fromhome") {
      setShowmodalFromHome(true);
    }
  }, [from]);

  const handleFetchDetails = async () => {
    let timeoutId;
    try {
      timeoutId = setTimeout(() => {
        if (Platform.OS === "android" && !movieData && !tvData) {
          ToastAndroid.show(
            "This is taking longer than usual. Please check your internet connection.",
            ToastAndroid.LONG
          );
        }
      }, 5000);
      setLoading(true);
      setError(false);
      const result = await FetchDetails(media_type, mainIdNumer);
      if (media_type === "movie") {
        setMovieData(result);
      } else if (media_type === "tv") {
        setTvData(result);
      }
      setLoading(false);
      setRefetch(false);
      clearTimeout(timeoutId);
    } catch (error) {
      clearTimeout(timeoutId);
      console.log(error);
      setLoading(false);
      setRefetch(false);
      setError(true);
      if (Platform.OS == "android") {
        ToastAndroid.show("Error", ToastAndroid.LONG);
      }
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <MainContent
        media_Movie={movieData}
        media_Tv={tvData}
        media_type={media_type}
        loading={loading}
        ferror={ferror}
        setRefetch={setRefetch}
        showModalFromHome={showModalFromHome}
      />
    </SafeAreaView>
  );
};

export default MovieDetails;
