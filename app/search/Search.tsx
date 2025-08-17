import LoadMoreIndicator from "@/components/LoadMoreIndicator";
import { SearchCard, TopSearchCard } from "@/components/SearchCard";
import { LinearCardListSkeleton } from "@/components/Skeleton";
import { icons } from "@/constants/icons";
import { FetchCountries, FetchQuery } from "@/services/api";
import { getTopSearch } from "@/services/appWrite";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import {
  Platform,
  ScrollView,
  Text,
  TextInput,
  ToastAndroid,
  TouchableHighlight,
  View,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";

const Search = () => {
  const navigation = useNavigation();
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [data, setData] = useState<Array<media_type>>([]);
  const [topSearched, setTopSearched] = useState<Array<TopSearch>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [ferror, setError] = useState<boolean>(false);
  const [countries, setCountries] = useState<Array<Countries_type>>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [paginationEnd, setPaginationEnd] = useState<boolean>(false);

  const reset = () => {
    setPage(1);
    setData([]);
    setPaginationEnd(false);
  };

  useEffect(() => {
    handleFetchCountries();
  }, []);

  const handleFetchCountries = async () => {
    try {
      const result = await FetchCountries();
      setCountries(result);
    } catch (error) {
      console.log(ferror);
    }
  };

  useEffect(() => {
    // if (countries.length === 0) return;
    if (query === "") {
      FetchTopSearch();
    } else {
      const timeOutId = setTimeout(async () => {
        if (query.trim()) {
          reset();
          await handleSearch();
        } else {
        }
      }, 700);
      return () => clearTimeout(timeOutId);
    }
  }, [query]);

  const handleSearch = async () => {
    try {
      setLoading(true);
      setError(false);
      const result: Array<media_type> = await FetchQuery(query, page);
      const mainResult = result.filter(
        (item) => item.media_type === "movie" || item.media_type === "tv"
      );
      if (result.length < 1) {
        setError(true);
        setErrorMessage("Media Not Found");
      } else {
        setData(mainResult);
        // updateSearchCount(query, result[0]);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
      setErrorMessage("Error Loading");
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
      const moreData: Array<media_type> = await FetchQuery(query, page);
      const mainResult = moreData.filter(
        (item) => item.media_type === "movie" || item.media_type === "tv"
      );
      if (mainResult.length === 0) {
        setLoadingMore(false);
        setPaginationEnd(true);
      }

      setData((prev) => [...prev, ...mainResult]);
      setLoadingMore(false);
    } catch (error) {
      setLoadingMore(false);
      console.log(error);

      if (Platform.OS === "android") {
        ToastAndroid.show("Error", 5);
      }
    }
  };

  const FetchTopSearch = async () => {
    try {
      setLoading(true);
      setError(false);
      const result = await getTopSearch();
      if (result && result.length >= 1) {
        setTopSearched(result);
      } else {
        setError(true);
        setErrorMessage("Empty");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
      setErrorMessage("Error Loading");
    }
  };

  return (
    <View className="flex-1 bg-primary">
      {/* Search Header */}
      <View className="w-full h-[80px] p-5">
        <View className="flex flex-row items-center flex-1 px-2 border rounded-lg border-gray-400/80">
          <TouchableHighlight onPress={() => navigation.goBack()}>
            {icons.backIcon()}
          </TouchableHighlight>
          <TextInput
            placeholder="Search"
            placeholderTextColor="gray"
            cursorColor="#84cc16"
            className="flex-1 h-full px-2 font-bold text-white outline-none "
            value={query}
            onChangeText={setQuery}
          />
          <TouchableHighlight
            onPress={() => {
              setQuery("");
            }}
          >
            {query === "" ? (
              icons.searchIcon()
            ) : (
              <Ionicons name="close-outline" size={24} color={"white"} />
            )}
          </TouchableHighlight>
        </View>
      </View>

      <View className="flex-1 px-5">
        <Text className="p-2 text-[1.3rem] font-bold text-white">
          {query === "" ? "Top Search" : "Results"}
        </Text>
        {loading ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            className="animate-pulse"
          >
            <LinearCardListSkeleton />
          </ScrollView>
        ) : ferror ? (
          <Text className="w-full text-lg font-bold text-center text-gray-400">
            {errorMessage}
          </Text>
        ) : query === "" ? (
          <FlatList
            style={{ paddingBottom: 10 }}
            data={topSearched}
            keyExtractor={(item) => item.movie_id.toString()}
            renderItem={({ item }) => (
              <TopSearchCard topSearch={item} countries={countries} />
            )}
            ItemSeparatorComponent={() => <View className="h-5" />}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <FlatList
            style={{ paddingBottom: 10 }}
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <SearchCard item={item} countries={countries} />
            )}
            ItemSeparatorComponent={() => <View className="h-5" />}
            showsVerticalScrollIndicator={false}
            onEndReached={() => setPage((prev) => prev + 1)}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              <LoadMoreIndicator
                loadingMore={loadingMore}
                paginationEnd={paginationEnd}
                errorMessage="No more media found. Try a different search?"
              />
            }
          />
        )}
      </View>
    </View>
  );
};

export default Search;
