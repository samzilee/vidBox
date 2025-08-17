import { Text, View } from "react-native";
import { Tabs } from "react-native-collapsible-tab-view";

export const Overview = ({ data }: { data: Moviedetails | TvShowDetails }) => {
  return (
    <Tabs.ScrollView>
      <View className="flex-col gap-10 p-5">
        {/* OverView */}
        <Text className="text-sm text-gray-500">{data?.overview}</Text>

        {/* Genre */}
        <View>
          <Text className="text-lg text-white">Genre</Text>
          <Text className="text-sm text-gray-500">
            {data?.genres.map((genre, index) => {
              return `${genre?.name}${index === data.genres?.length - 1 ? "" : ", "}`;
            })}
          </Text>
        </View>

        {/* Casts */}
        <View>
          <Text className="text-lg text-white">Casts</Text>
          <Text className="text-sm text-gray-500">
            {data?.credits.cast.map((cast, index) => {
              return `${cast?.name}${index === data?.credits.cast.length - 1 ? "" : ", "}`;
            })}
          </Text>
        </View>

        {/* Production */}
        <View>
          <Text className="text-lg text-white">Production</Text>
          <Text className="text-sm text-gray-500">
            {data?.production_companies.map((production, index) => {
              return `${production?.name}${index === data?.production_companies.length - 1 ? "" : ", "}`;
            })}
          </Text>
        </View>
      </View>
    </Tabs.ScrollView>
  );
};
