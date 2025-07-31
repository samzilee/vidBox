import DetailHeader from "@/components/DetailHeader";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

interface prop {
  media_data: TvShowDetails | null;
  loading: boolean;
}

const Tv = ({ media_data, loading }: prop) => {
  const navigate = useNavigation();
  return (
    <View>
      <View className="absolute top-0 z-50 w-full p-5 shadow-inner">
        <TouchableOpacity onPress={() => navigate.goBack()} className="w-fit">
          <Ionicons name="arrow-back-outline" size={29} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <DetailHeader media_data={media_data} />
      </ScrollView>
    </View>
  );
};

export default Tv;
