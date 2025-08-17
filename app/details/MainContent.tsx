import { Casts } from "@/components/Casts";
import Episodes from "@/components/Episodes";
import { Overview } from "@/components/Overview";
import { Related } from "@/components/Related";
import Video from "@/components/Video";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialTabBar, Tabs } from "react-native-collapsible-tab-view";
import Header from "./Header";

interface prop {
  media_Movie: Moviedetails | null;
  media_Tv: TvShowDetails | null;
  media_type: string;
  loading: boolean;
  ferror: boolean;
  setRefetch: React.Dispatch<React.SetStateAction<boolean>>;
  showModalFromHome: boolean;
}

const MainContent = ({
  media_Movie,
  media_Tv,
  media_type,
  loading,
  ferror,
  setRefetch,
  showModalFromHome,
}: prop) => {
  const navigate = useNavigation();
  const [media_data, setMedia_data] = useState<any>(null);

  useEffect(() => {
    setMedia_data(() => {
      if (media_type === "movie") {
        return media_Movie as Moviedetails;
      } else {
        return media_Tv as TvShowDetails;
      }
    });
  }, [media_Movie, media_Tv]);

  return loading ? (
    <View className="items-center justify-center flex-1">
      <ActivityIndicator size="large" color="#84cc16" />
    </View>
  ) : ferror ? (
    <View className="items-center justify-center flex-1">
      <View className="w-[80%]  gap-5">
        <Text className="text-lg font-bold text-center text-red-500">
          Somthing went wrong!
        </Text>
        <View className="flex-row gap-5 h-[40px]">
          <TouchableOpacity
            onPress={() => setRefetch(true)}
            className="flex items-center justify-center flex-1 rounded-lg bg-secondary"
          >
            <Text className="text-lg font-bold text-white">Reload</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigate.goBack()}
            className="flex items-center justify-center flex-1 bg-blue-500 rounded-lg"
          >
            <Text className="text-lg font-bold text-white">Go Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  ) : (
    <Tabs.Container
      renderTabBar={(props) => (
        <MaterialTabBar
          {...props}
          tabStyle={{ flex: 1 }}
          indicatorStyle={{ backgroundColor: "#84cc16" }}
          style={{
            backgroundColor: "#111827",
            paddingHorizontal: 15,
            paddingVertical: 10,
          }}
          labelStyle={{
            fontSize: 13,
            fontWeight: "bold",
            marginLeft: 6,
            paddingHorizontal: 10,
          }}
          getLabelText={(name) => name}
          activeColor="#84cc16"
          scrollEnabled
          inactiveColor="white"
        />
      )}
      renderHeader={() => (
        <Header
          media_data={media_data}
          media_type={media_type}
          showModalFromHome={showModalFromHome}
        />
      )}
      allowHeaderOverscroll={true}
      pagerProps={Platform.OS === "web" ? { scrollEnabled: false } : {}}
    >
      {media_type === "tv" ? (
        <Tabs.Tab name="Episodes">
          <Episodes media_data={media_data} />
        </Tabs.Tab>
      ) : null}
      <Tabs.Tab name="Overview">
        <Overview data={media_data} />
      </Tabs.Tab>
      <Tabs.Tab name="Casts">
        <Casts data={media_data} />
      </Tabs.Tab>
      <Tabs.Tab name="Related">
        <Related data={media_data} media_type={media_type} />
      </Tabs.Tab>
      <Tabs.Tab name="Videos">
        <Video id={media_data?.id} media_type={media_type} />
      </Tabs.Tab>
    </Tabs.Container>
  );
};

export default MainContent;
