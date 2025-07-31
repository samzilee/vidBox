import { ScrollView, Text, View } from "react-native";

export const Overview = ({ data }: { data: Movedetails | null }) => {
  if (!data) return;
  return (
    <ScrollView className="flex-1">
      <View className="flex-col gap-10 px-5 pt-5">
        {/* OverView */}
        <Text className="text-sm text-gray-500">{data.overview}</Text>

        {/* Genre */}
        <View>
          <Text className="text-lg text-white">Genre</Text>
          <Text className="text-sm text-gray-500">
            {data.genres.map((genre, index) => {
              return `${genre.name}${index === data.genres.length - 1 ? "" : ", "}`;
            })}
          </Text>
        </View>

        {/* Casts */}
        <View>
          <Text className="text-lg text-white">Casts</Text>
          <Text className="text-sm text-gray-500">
            {data.credits.cast.map((cast, index) => {
              return `${cast.name}${index === data.credits.cast.length - 1 ? "" : ", "}`;
            })}
          </Text>
        </View>

        {/* Production */}
        <View>
          <Text className="text-lg text-white">Genre</Text>
          <Text className="text-sm text-gray-500">
            {data.production_companies.map((production, index) => {
              return `${production.name}${index === data.production_companies.length - 1 ? "" : ", "}`;
            })}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};
