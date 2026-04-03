import { icons } from "@/constants/icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function more() {
  const [showSign_inModal, setShowSign_inModal] = useState<boolean>(false);

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <View className="flex-col flex-1 gap-5 px-6 ">
        {/* Header */}
        {/* <View className="flex-row items-center justify-between w-full ">
          <Text className="text-[1.7rem] font-bold text-white">Settings</Text>
        </View> */}

        {/* my profile */}
        <View className="w-full gap-5 p-6 bg-gray-800 rounded-md">
          <View>
            <Text className="text-lg font-bold text-white">My profile</Text>
            <Text className="text-[0.9rem] font-semibold text-gray-300">
              Sign in to synchronize your movies and series
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => router.push("/authPage/LoginModal")}
            className="items-center py-3 rounded-lg bg-secondary/60"
          >
            <Text className="font-bold text-white">Continue</Text>
          </TouchableOpacity>
        </View>

        {/* settings */}
        <View className="p-2">
          {/* contact */}
          <TouchableOpacity className="flex-row gap-3">
            {icons.mailIcon()}
            <Text className="flex-1 font-semibold text-white">Contact</Text>
            {icons.forwardIcons()}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
