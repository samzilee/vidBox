import { FetchEpisodes } from "@/services/api";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Tabs } from "react-native-collapsible-tab-view";
import WatchModal from "./WatchModal";

const Episodes = ({ media_data }: { media_data: TvShowDetails }) => {
  const [selectedSeason, setSelectedSeason] = useState<Season | null>(null);
  const [chooseSeason, setChooseSeason] = useState<boolean>(false);
  const [allEpisodes, setAllEpisodes] = useState<SeasonData | null>(null);
  const [episodes, setEpisodes] = useState<Array<Episode>>([]);
  const [showModal, setShowmodal] = useState<boolean>(false);
  const [watching, setWatching] = useState<Episode | null>(null);

  useEffect(() => {
    if (!selectedSeason) {
      setSelectedSeason(() => {
        return media_data.seasons.filter(
          (season) => season.season_number !== 0
        )[0];
      });
    }
  }, []);

  useEffect(() => {
    handleGetEpisode();
  }, [selectedSeason]);

  const handleGetEpisode = async () => {
    if (!selectedSeason) return;
    try {
      setEpisodes([]);
      const result: SeasonData = await FetchEpisodes(
        media_data.id,
        selectedSeason.season_number
      );
      setAllEpisodes(result);
      setEpisodes(result.episodes.slice(0, 20));
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoadMoreEp = () => {
    setEpisodes((prev) => {
      const add = allEpisodes?.episodes.slice(
        episodes.length,
        episodes.length + 20
      );
      if (add) {
        return [...prev, ...add];
      } else {
        return prev;
      }
    });
  };

  const handleWatchShow = (epInfo: Episode) => {
    setWatching(epInfo);
    setShowmodal(true);
  };

  if (!media_data && !allEpisodes) return;
  return (
    <Tabs.ScrollView
      className="py-10"
      scrollEnabled={!chooseSeason}
      stickyHeaderIndices={[0]}
    >
      <TouchableOpacity
        onPress={() => {
          setChooseSeason(true);
        }}
      >
        {/* Header / selector Bar */}
        <View className="w-full bg-gray-800 h-[80px] rounded-lg p-5 flex-row items-center ">
          <View className="flex-1">
            <Text className="text-lg font-semibold text-white">
              Season {selectedSeason?.season_number} /{" "}
              {media_data.number_of_seasons}
            </Text>
            <Text className="text-sm font-semibold text-gray-400">
              Episodes {selectedSeason?.episode_count} / Name —{" "}
              {selectedSeason?.name}
            </Text>
          </View>

          <Ionicons name="chevron-back" size={24} color={"white"} />
        </View>
      </TouchableOpacity>
      <View className="flex-1 px-5">
        {/* episodes List */}
        <View className="flex-1 pt-5 pb-10">
          <View className="flex-col gap-5">
            {episodes.map((ep, index) => {
              if (!ep.show_id) return null;

              return (
                <TouchableOpacity
                  onPress={() => handleWatchShow(ep)}
                  key={index}
                  className="flex-row gap-5"
                >
                  <View className="w-[170px] h-[100px] border rounded bg-gray-500 relative">
                    <Image
                      source={{
                        uri: `https://image.tmdb.org/t/p/w300${ep.still_path}`,
                      }}
                      resizeMode="cover"
                      className="size-full"
                    />
                    <Text className="absolute text-xl bottom-[2px] left-[5px] font-bold text-white">
                      {ep.episode_number < 10
                        ? `0${ep.episode_number}`
                        : ep.episode_number}
                    </Text>
                    <View className="absolute items-center justify-center w-full h-full">
                      <Ionicons
                        name="play-circle-outline"
                        size={35}
                        selectionColor={"gray"}
                        color={"white"}
                        className="rounded-full bg-black/70"
                      />
                    </View>
                  </View>
                  <View className="flex-1">
                    <Text
                      className="text-lg font-semibold text-white"
                      numberOfLines={1}
                    >
                      {ep.name ||
                        `Episode ${
                          ep.episode_number < 10
                            ? `0${ep.episode_number}`
                            : ep.episode_number
                        }`}
                    </Text>
                    <Text className="text-sm font-normal text-gray-600">
                      Released {ep.air_date?.split("-").join("/") || "N/A"}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}

            {/* Load More Button */}
            {allEpisodes &&
            allEpisodes.episodes &&
            episodes.length !== 0 &&
            episodes.length < allEpisodes.episodes.length ? (
              <TouchableOpacity
                className="items-center justify-center w-full mb-5 border-[1.6px] border-gray-600 rounded"
                onPress={handleLoadMoreEp}
              >
                <Text className="text-lg font-semibold text-gray-600">
                  Load More
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>

        {/* seasons selection option */}
        <Modal visible={chooseSeason} animationType="slide">
          <View className="flex-1 bg-primary">
            <TouchableOpacity onPress={() => setChooseSeason(false)}>
              <View className="items-end w-full pt-5 pr-9 ">
                <Ionicons name="close" size={30} color="white" />
              </View>
            </TouchableOpacity>

            <ScrollView className="flex-1 p-5">
              <View className="flex-col items-center justify-center flex-1 w-full gap-5 pb-10">
                {media_data?.seasons.map((season, index) => {
                  if (season.season_number === 0) return;
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        setSelectedSeason(season);
                        setChooseSeason(false);
                      }}
                      className={`${season.id === selectedSeason?.id ? "bg-gray-700" : "bg-gray-800/90"} h-[80px] w-full rounded-lg  flex-row `}
                      key={index}
                    >
                      <View className="flex-col flex-1 p-5 g ">
                        <Text className="text-lg font-semibold text-white">
                          Season {season?.season_number}
                        </Text>
                        <Text className="text-sm font-semibold text-gray-400">
                          Episodes {season?.episode_count} / Name —{" "}
                          {season?.name}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>
          </View>
        </Modal>

        <WatchModal
          setShowmodal={setShowmodal}
          setWatching={setWatching}
          showModal={showModal}
          media_type="tv"
          id={watching?.show_id}
          season={watching?.season_number}
          episode={watching?.episode_number}
          fullEpisodes={allEpisodes}
        />
      </View>
    </Tabs.ScrollView>
  );
};

export default Episodes;
