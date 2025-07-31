import { Stack } from "expo-router";
import React from "react";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "./global.css";

export default function _layout() {
  return (
    <GestureHandlerRootView>
      <StatusBar hidden={false} />
      <Stack screenOptions={{ freezeOnBlur: true, navigationBarHidden: true }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="details/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="search/Search" options={{ headerShown: false }} />
        <Stack.Screen name="viewAll/[type]" options={{ headerShown: false }} />
      </Stack>
    </GestureHandlerRootView>
  );
}
