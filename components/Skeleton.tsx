import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export const ShowCaseSkeleton = () => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View className="w-[140px] h-[190px] mr-4 bg-gray-500 rounded-lg animate-pulse"></View>
      <View className="w-[140px] h-[190px] mr-4 bg-gray-500 rounded-lg animate-pulse"></View>
      <View className="w-[140px] h-[190px] mr-4 bg-gray-500 rounded-lg animate-pulse"></View>
      <View className="w-[140px] h-[190px] mr-4 bg-gray-500 rounded-lg animate-pulse"></View>
      <View className="w-[140px] h-[190px] mr-4 bg-gray-500 rounded-lg animate-pulse"></View>
      <View className="w-[140px] h-[190px] mr-4 bg-gray-500 rounded-lg animate-pulse"></View>
    </ScrollView>
  );
};

export const SearchCardSkeleton = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} className="animate-pulse">
      <View className="flex flex-row flex-1 gap-5 mb-5 h-fit ">
        <View className="w-[100px] h-[130px] rounded-lg bg-gray-500"></View>
        <View className="flex flex-col flex-1 gap-3">
          <View className="w-[60%] h-[18px] bg-gray-500 rounded-lg"></View>
          <View className="w-[90%] h-[18px] bg-gray-500 rounded-lg"></View>
          <View className="w-[80%] h-[18px] bg-gray-500 rounded-lg"></View>
        </View>
      </View>

      <View className="flex flex-row flex-1 gap-5 mb-5 h-fit ">
        <View className="w-[100px] h-[130px] rounded-lg bg-gray-500"></View>
        <View className="flex flex-col flex-1 gap-3">
          <View className="w-[60%] h-[18px] bg-gray-500 rounded-lg"></View>
          <View className="w-[90%] h-[18px] bg-gray-500 rounded-lg"></View>
          <View className="w-[80%] h-[18px] bg-gray-500 rounded-lg"></View>
        </View>
      </View>

      <View className="flex flex-row flex-1 gap-5 mb-5 h-fit ">
        <View className="w-[100px] h-[130px] rounded-lg bg-gray-500"></View>
        <View className="flex flex-col flex-1 gap-3">
          <View className="w-[60%] h-[18px] bg-gray-500 rounded-lg"></View>
          <View className="w-[90%] h-[18px] bg-gray-500 rounded-lg"></View>
          <View className="w-[80%] h-[18px] bg-gray-500 rounded-lg"></View>
        </View>
      </View>

      <View className="flex flex-row flex-1 gap-5 mb-5 h-fit ">
        <View className="w-[100px] h-[130px] rounded-lg bg-gray-500"></View>
        <View className="flex flex-col flex-1 gap-3">
          <View className="w-[60%] h-[18px] bg-gray-500 rounded-lg"></View>
          <View className="w-[90%] h-[18px] bg-gray-500 rounded-lg"></View>
          <View className="w-[80%] h-[18px] bg-gray-500 rounded-lg"></View>
        </View>
      </View>

      <View className="flex flex-row flex-1 gap-5 mb-5 h-fit ">
        <View className="w-[100px] h-[130px] rounded-lg bg-gray-500"></View>
        <View className="flex flex-col flex-1 gap-3">
          <View className="w-[60%] h-[18px] bg-gray-500 rounded-lg"></View>
          <View className="w-[90%] h-[18px] bg-gray-500 rounded-lg"></View>
          <View className="w-[80%] h-[18px] bg-gray-500 rounded-lg"></View>
        </View>
      </View>

      <View className="flex flex-row flex-1 gap-5 mb-5 h-fit ">
        <View className="w-[100px] h-[130px] rounded-lg bg-gray-500"></View>
        <View className="flex flex-col flex-1 gap-3">
          <View className="w-[60%] h-[18px] bg-gray-500 rounded-lg"></View>
          <View className="w-[90%] h-[18px] bg-gray-500 rounded-lg"></View>
          <View className="w-[80%] h-[18px] bg-gray-500 rounded-lg"></View>
        </View>
      </View>
    </ScrollView>
  );
};
