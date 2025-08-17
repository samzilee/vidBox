import React, { useEffect } from "react";
import { ActivityIndicator, Platform, ToastAndroid, View } from "react-native";

const LoadMoreIndicator = ({
  loadingMore,
  paginationEnd,
  errorMessage,
}: {
  loadingMore: boolean;
  paginationEnd: boolean;
  errorMessage: string;
}) => {
  useEffect(() => {
    if (paginationEnd && Platform.OS === "android") {
      ToastAndroid.show(errorMessage, 5);
    }
  }, [paginationEnd]);
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
