import DetailPoster from "@/components/DetailPoster";
import WatchModal from "@/components/WatchModal";
import { icons } from "@/constants/icons";
import { FetchEpisodes } from "@/services/api";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const Header = ({
  media_data,
  media_type,
  showModalFromHome,
}: {
  media_data: Moviedetails | TvShowDetails;
  media_type: string;
  showModalFromHome: boolean;
}) => {
  const [showModal, setShowmodal] = useState<boolean>(() => {
    return showModalFromHome ? showModalFromHome : false;
  });
  const [episode1, setEpisode1] = useState<Episode | null>(null);
  const [allEpisodes, setAllEpisodes] = useState<SeasonData | null>(null);

  useEffect(() => {
    if (media_type === "tv" && media_data) {
      handleGetEpisodeOne();
    }
  }, [media_data]);

  const handleGetEpisodeOne = async () => {
    try {
      const result: SeasonData = await FetchEpisodes(media_data.id, 1);

      const ep1 = result.episodes.filter(
        (episode) => episode.episode_number === 1
      );
      setAllEpisodes(result);
      setEpisode1(ep1[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigation();
  return (
    <View className="bg-primary">
      <View className="absolute top-0 z-50 w-full p-5 shadow-inner">
        {/* Header */}
        <TouchableOpacity onPress={() => navigate.goBack()} className="w-fit">
          {icons.backIcon()}
        </TouchableOpacity>
      </View>

      {/* Deatil Header */}
      <DetailPoster media_data={media_data} />

      <View className="flex-row items-center w-full gap-5 px-5 py-5 ">
        {/* Add List */}
        <TouchableOpacity
          onPress={() => {}}
          className="flex-col items-center gap-1"
          disabled={!media_data && true}
        >
          <Ionicons name="bookmark-outline" size={24} color="#9ca3af" />
          <Text className="text-sm font-semibold text-gray-400">Add List</Text>
        </TouchableOpacity>

        {/* Watch Button */}
        <TouchableOpacity
          className="flex-row items-center justify-center flex-1 py-3 rounded-lg bg-secondary"
          onPress={() => {
            setShowmodal(true);
          }}
          disabled={!media_data && true}
        >
          <Text className="text-lg font-bold">Watch</Text>
          <Ionicons name="play" size={24} color="black" />
        </TouchableOpacity>

        {media_type === "movie" ? (
          <WatchModal
            setShowmodal={setShowmodal}
            showModal={showModal}
            id={media_data?.id}
            media_type={media_type}
            fullEpisodes={null}
          />
        ) : (
          episode1 && (
            <WatchModal
              setWatching={setEpisode1}
              setShowmodal={setShowmodal}
              media_type={media_type}
              showModal={showModal}
              id={episode1.show_id}
              season={episode1.season_number}
              episode={episode1.episode_number}
              fullEpisodes={allEpisodes}
            />
          )
        )}
      </View>
    </View>
  );
};

export default Header;
