import React from "react";
import { ActivityIndicator, View } from "react-native";

const LoadMoreIndicator = ({
  loadingMore,
  paginationEnd,
}: {
  loadingMore: boolean;
  paginationEnd: boolean;
}) => {
  return (
    loadingMore &&
    !paginationEnd && (
      <View className="p-5">
        <ActivityIndicator size="large" color="#84cc16" />
      </View>
    )
  );
};

export default LoadMoreIndicator;
