import { countries } from "@/constants/countries";
import { movieGenres, tvGenres } from "@/constants/genres";
import { icons } from "@/constants/icons";
import { DiscoverMedias } from "@/services/api";

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FlatGrid } from "react-native-super-grid";
import LoadMoreIndicator from "./LoadMoreIndicator";

interface props {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  media_type: string;
}

interface type {
  param: string;
  title: string;
}

const types = [
  // {
  //   param: "all",
  //   title: "All Types",
  // },
  {
    param: "movie",
    title: "Movies",
  },
  {
    param: "tv",
    title: "TV Series",
  },
];

const handleChecked = (checked: boolean) => {
  return checked ? (
    <Ionicons name="checkmark-outline" size={24} color={"#84cc16"} />
  ) : (
    <View className="bg-gray-600 rounded size-5"></View>
  );
};

const FilterModal = ({ showModal, setShowModal, media_type }: props) => {
  const [type, setType] = useState<type | null>(null);
  const [genres, setGenres] = useState<Array<Genre>>([]);
  const [selectedGenres, setSelectedGenres] = useState<Array<Genre>>([]);
  const [country, setCountry] = useState<CountryProps | null>(null);
  const [filteredMedia, setFilteredMedia] = useState<Array<media_type>>([]);
  const [filterMode, setFilterMode] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [paginationEnd, setPaginationEnd] = useState<boolean>(false);
  const [ferror, setError] = useState<boolean>(false);

  useEffect(() => {
    setType(() => {
      return types.filter((type) => type.param === media_type)[0];
    });
  }, []);

  useEffect(() => {
    setGenres(() => {
      if (type?.param === "movie") return movieGenres;

      return tvGenres;
    });
  }, [type]);

  const Reset = () => {
    setType(() => {
      return types.filter((type) => type.param === media_type)[0];
    });
    setSelectedGenres([]);
    setCountry(null);
    setFilteredMedia([]);
    setFilterMode(false);
    setPage(1);
    setLoading(false);
    setLoadingMore(false);
    setPaginationEnd(false);
  };

  useEffect(() => {
    if (filterMode) {
      fetchMedia();
    }
  }, [country, selectedGenres, type]);

  useEffect(() => {
    if (filterMode) {
      handleLoadMore();
    }
  }, [page]);

  const handleLoadMore = async () => {
    try {
      setLoadingMore(true);
      const result = await DiscoverMedias(
        selectedGenres,
        country,
        page,
        type?.param || media_type
      );
      setFilteredMedia((prev) => {
        return [...prev, ...result];
      });
      if (result.length == 0) {
        setPaginationEnd(true);
      }
      setLoadingMore(false);
    } catch (error) {
      console.log(error);
      setLoadingMore(false);
    }
  };

  const fetchMedia = async () => {
    try {
      setLoading(true);
      const result = await DiscoverMedias(
        selectedGenres,
        country,
        page,
        type?.param || media_type
      );
      setFilteredMedia(result);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
    }
  };

  const handleSubmit = () => {
    setFilterMode(true);
    fetchMedia();
  };

  const handleReset = () => {
    setType(() => {
      return types.filter((type) => type.param === media_type)[0];
    });
    setSelectedGenres([]);
    setCountry(null);
  };

  return (
    <Modal animationType="fade" visible={showModal}>
      <View className="w-full h-full bg-primary">
        <View className="w-full p-5">
          <TouchableOpacity
            onPress={() => setShowModal(false)}
            className="flex-row items-center"
          >
            {icons.backIcon()}
            <Text className="text-2xl font-bold text-white">Filter</Text>
          </TouchableOpacity>
        </View>

        {filterMode ? (
          ferror ? (
            <Text className="pt-5 text-sm font-semibold text-center text-red-700">
              ❌ Failed to load data. Check your connection and try again.
            </Text>
          ) : (
            // when a user submit his Filter this page will take over
            <>
              <View className="flex-row justify-between px-5">
                <Text className="text-lg font-semibold text-white">
                  Results
                </Text>

                <TouchableOpacity
                  onPress={() => setFilterMode(false)}
                  className="flex-row items-center"
                >
                  <Text className="text-lg font-semibold text-secondary">
                    Filter
                  </Text>
                  <Ionicons name="filter" size={24} color={"#84cc16"} />
                </TouchableOpacity>
              </View>

              <View className="flex-row w-full px-5 py-5 h-fit">
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {/* Type Indicator */}
                  <View className="flex-row items-center border-[1px] border-gray-500 gap-1 rounded-lg h-7 px-5 mr-2">
                    <Text className="text-sm font-normal text-white">
                      {type?.title}
                    </Text>
                    <View>
                      <Ionicons name="close" size={14} color={"gray"} />
                    </View>
                  </View>

                  {/* Country indicator */}
                  {country && (
                    <View className="flex-row items-center border-[1px] border-gray-500 gap-1 rounded-lg h-7 px-5 mr-2">
                      <Text className="text-sm font-normal text-white">
                        {country?.english_name}
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          setCountry(null);
                        }}
                      >
                        <Ionicons name="close" size={14} color={"white"} />
                      </TouchableOpacity>
                    </View>
                  )}

                  {/* Genres inDicator */}
                  {selectedGenres.map((genre, index) => {
                    return (
                      <View
                        key={index}
                        className="flex-row items-center border-[1px] border-gray-500 gap-1 rounded-lg h-7 px-5 mr-2"
                      >
                        <Text className="text-sm font-normal text-white">
                          {genre.name}
                        </Text>
                        <TouchableOpacity
                          onPress={() => {
                            setSelectedGenres((prev) => {
                              return prev.filter(
                                (prevGrenre) => prevGrenre.id !== genre.id
                              );
                            });
                          }}
                        >
                          <Ionicons name="close" size={14} color={"white"} />
                        </TouchableOpacity>
                      </View>
                    );
                  })}
                </ScrollView>
              </View>

              {loading ? (
                <View className="items-center justify-center flex-1 ">
                  <ActivityIndicator size="large" color="#84cc16" />
                </View>
              ) : (
                <FlatGrid
                  data={filteredMedia}
                  spacing={10}
                  itemDimension={100}
                  showsVerticalScrollIndicator={false}
                  ListEmptyComponent={() => (
                    <Text className="text-lg font-bold text-center text-gray-500">
                      No results found for your filter.
                    </Text>
                  )}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => {
                        router.push(`/details/${item.id}_${type?.param}`);
                      }}
                      className="h-[200px]"
                    >
                      <Image
                        source={{
                          uri: `https://image.tmdb.org/t/p/w300${item.poster_path || item.backdrop_path}`,
                        }}
                        className="bg-gray-500 rounded-lg size-full"
                        resizeMode="cover"
                      />
                    </TouchableOpacity>
                  )}
                  ListFooterComponent={
                    <LoadMoreIndicator
                      loadingMore={loadingMore}
                      paginationEnd={paginationEnd}
                      errorMessage="No more media found"
                    />
                  }
                  onEndReached={() =>
                    !loadingMore && setPage((prev) => prev + 1)
                  }
                />
              )}
            </>
          )
        ) : (
          <>
            {/* Main */}
            <ScrollView showsVerticalScrollIndicator={false}>
              <View className="px-5">
                <View className="flex-col mb-5">
                  <Text className="text-lg font-bold text-white">Types</Text>
                  <View className="flex-row gap-5 ">
                    {types.map((item, index) => {
                      return (
                        <TouchableOpacity
                          key={index}
                          className="flex-row items-center gap-2"
                          onPress={() => {
                            setType(item);
                            setSelectedGenres([]);
                          }}
                        >
                          <View className="items-center justify-center size-8">
                            {handleChecked(item.param === type?.param)}
                          </View>
                          <Text
                            className={`${item.param === type?.param ? "text-secondary" : "text-gray-500"} font-semibold`}
                          >
                            {item.title}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>

                <View className="flex-col mb-5">
                  <Text className="text-lg font-bold text-white ">Genres</Text>
                  <View className="flex-row flex-wrap gap-2">
                    {genres.map((item, index) => {
                      return (
                        <TouchableOpacity
                          key={index}
                          className="flex-row items-center"
                          onPress={() => {
                            setSelectedGenres((prev) => {
                              if (selectedGenres?.includes(item)) {
                                return (
                                  prev?.filter(
                                    (genre) => genre.id !== item.id
                                  ) || []
                                );
                              }
                              if (!prev) return [item];
                              return [...prev, item];
                            });
                          }}
                        >
                          <View className="items-center justify-center size-8">
                            {handleChecked(
                              selectedGenres?.includes(item) ? true : false
                            )}
                          </View>
                          <Text
                            className={`${selectedGenres?.includes(item) ? "text-secondary" : "text-gray-500"} font-semibold`}
                          >
                            {item.name}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>

                <View className="flex-col mb-5">
                  <Text className="text-lg font-bold text-white ">
                    Countries
                  </Text>
                  <View className="flex-row flex-wrap gap-2">
                    {countries.map((item, index) => {
                      return (
                        <TouchableOpacity
                          key={index}
                          className="flex-row items-center gap-2"
                          onPress={() =>
                            setCountry((prev) => {
                              if (prev?.iso_3166_1 === item.iso_3166_1)
                                return null;
                              return item;
                            })
                          }
                        >
                          <View className="items-center justify-center size-8">
                            {handleChecked(
                              item.iso_3166_1 === country?.iso_3166_1
                            )}
                          </View>
                          <Text
                            className={`${item.iso_3166_1 === country?.iso_3166_1 ? "text-secondary" : "text-gray-500"} font-semibold`}
                          >
                            {item.english_name}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
              </View>
            </ScrollView>

            <View className="flex-row gap-5 p-5 h-[80px] ">
              <TouchableOpacity
                onPress={() => handleSubmit()}
                className="items-center justify-center flex-1 rounded-lg bg-secondary"
              >
                <Text className="text-lg font-semibold ">Submit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleReset()}
                className="items-center justify-center w-[100px] rounded-lg bg-gray-500"
              >
                <Text className="text-lg font-semibold text-white">Reset</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </Modal>
  );
};

export default FilterModal;
